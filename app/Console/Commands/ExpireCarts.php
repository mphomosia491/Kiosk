<?php

namespace App\Console\Commands;

use App\Models\Cart;
use Illuminate\Console\Command;


class ExpireCarts extends Command
{
    protected $signature = 'app:expire-carts';
    protected $description = 'Expire aboandoned carts and restore stock';

    public function handle()
    {
        $expiredCarts = Cart::with('items.product')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<=', now())
            ->get();
        
        $count = 0;

        foreach($expiredCarts as $cart){
            foreach($cart->items as $item){
                $item->product->increment('stock', $item->quantity);
            }
            $cart->items()->delete();

            $cart->update([
                'expires_at' => null
            ]);
            $count++;
        }
        $this->info(
            "{$count} cart(s) expired successfully."
        );

        return Command::SUCCESS;
    }
}
