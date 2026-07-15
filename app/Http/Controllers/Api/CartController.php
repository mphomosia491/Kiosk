<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($validated['product_id']);

        if($product->stock < $validated['quantity'])
            {
                return response()->json([
                    'message' => 'Insufficient stock'
                ], 422);
            }
        
        $cart = $request->user()->cart;

        $product->decrement('stock', $validated['quantity']);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();
        
        if ($cartItem)
            {
                $cartItem->quantity += $validated['quantity'];
                $cartItem->save();
            }else{
                CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $product->id,
                    'quantity' => $validated['quantity'],
                    'price' => $product->price,
                ]);
            }
        
            $cart->update([
                'expires_at' => now()->addMinutes(2)
            ]);

            return response()->json([
                'message' => 'Product added to cart'
            ]);
    }
    // public function index(Request $request)
    // {
    //     $cart = $request->user()
    //         ->cart()
    //         ->with('items.product')
    //         ->first();
    
    //     return response()->json($cart);
    // }
    public function index(Request $request)
    {
        $cart = $request->user()->cart;

        return response()->json(
            $cart->items()->with('product')->get()
        );
    }

    public function remove(Request $request, $itemId)
    {
       $cart = $request->user()->cart;

       $cartItem = $cart->items()
            ->with('product')
            ->findOrFail($itemId);
        
        $cartItem->product->increment(
            'stock', 
            $cartItem->quantity);

        $cartItem->delete();

        return response()->json([
            'message' => 'Item removed successfully'
        ]);
    }
    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'delivery_type' => ['required', 'in:pickup,delivery'],
            'delivery_address' => ['nullable', 'string']
        ]);

        if($validated['delivery_type'] === 'delivery' &&
        empty($validated['delivery_address']))
        {
            return response()->json([
                'message' => 'Delivery address is required'
            ], 422);
        }

        $user = $request->user();

        $cart = $user->cart()
            ->with('items.product')
            ->first();
        
            if(!$cart || $cart->items->isEmpty())
                {
                    return response()->json([
                        'message' => 'Cart is empty'
                    ], 422);
                }
        return DB::transaction(function () use (
            $user,
            $cart,
            $validated
        ){
            $subtotal = 0;
            $totalItems = 0;

            foreach ($cart->items as $item){
                $subtotal += $item->price * $item->quantity;
                $totalItems += $item->quantity;
            }

            $deliveryFee = $validated['delivery_type'] === 'delivery'
                ? 100 : 0;
            
                $total = $subtotal + $deliveryFee;

            $wallet = $user->wallet;

            if ($wallet->balance < $total){
                return response()->json([
                    'message' => 'Insufficient wallet balance'
                ], 422);
            }
            $wallet->decrement(
                'balance', $total
            );
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'KSK-' . now()->format('YmdHis'),
                'total_price' => $total,
                'total_items' => $totalItems,
                'delivery_type' => $validated['delivery_type'],
                'delivery_address' => $validated['delivery_address'] ?? null,
                'delivery_fee' => $deliveryFee,
                'status' => 'completed'
            ]);

            foreach ($cart->items as $item){
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price
                ]);
            }
            CartItem::where('cart_id', $cart->id)->delete();
            $cart->update([
                'expires_at' => null
            ]);
            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order
            ]);
        });
    }

}
