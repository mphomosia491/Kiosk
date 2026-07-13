<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with([
                'items.product'
            ])
            ->latest()
            ->get();
        
            return response()->json($orders);
    }

    public function show(Request $request, Order $order)
    {
        if($order->user_id !== $request->user()->id)
            {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 403);
            }
        $order->load([
            'items.product'
        ]);

        return response()->json($order);
    }
}
