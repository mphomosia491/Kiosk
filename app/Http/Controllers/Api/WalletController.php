<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WalletController extends Controller
{
    public function fund(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:1']
        ]);
        $wallet = $request->user()->wallet;

        $newBalance = $wallet->balance + $validated['amount'];

        if ($newBalance > 5000) {
            return response()->json([
                'message' => 'Wallet Cannot Exceed 5000'
            ], 422);
        }

        $wallet->balance = $newBalance;
        $wallet->save();

        return response()->json([
            'message' => 'Funds added successfuly',
            'balance' => $wallet->balance
        ]);
    }
    public function balance(Request $request)
    {
        return response()->json([
            'balance' => $request->user()->wallet->balance
        ]);
    }
}
