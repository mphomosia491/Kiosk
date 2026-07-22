import { useEffect, useState } from "react";
import {
    ShieldCheck,
    Wallet as WalletIcon,
    Plus,
    Send,
    Clock3,
} from "lucide-react";
import walletService from "../services/walletService";
import Layout from "../components/ui/Layout/Layout";
import "./wallet.css";

function Wallet() {

    const [balance, setBalance] =useState(0);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {

        loadBalance();

    }, []);

    const loadBalance = async () => {

        try {

            const wallet = await walletService.getBalance();

            setBalance(wallet.balance);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const fundWallet = async (e) => {

        e.preventDefault();

        setMessage("");

        try {

            const wallet = await walletService.fundWallet(
                Number(amount)
            );

            setBalance(wallet.balance);

            setAmount("");

            setMessage("Funds added successfully");

        } catch (err) {

            console.error(err);

            setMessage(
                err.response?.data?.message ??
                "Unable to fund wallet."
            );

        }

    };

    if (loading) {

        return (

            <Layout>

                <div className="wallet-loading">

                    <WalletIcon size={55} />

                    <h2>Loading Wallet...</h2>

                    <p>Please wait while we retrieve your balance.</p>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <section className="wallet-page">

                <section className="wallet-hero">

                    <div className="wallet-hero-left">

                        <h1 className="wallet-title">

                            My Wallet

                        </h1>

                        <p className="wallet-subtitle">

                            Manage your balance, add funds and
                            securely pay for luxury fragrances
                            using your Blue Reserve wallet.

                        </p>

                    </div>

                    <div className="wallet-hero-right">

                        <div className="wallet-security">

                            <ShieldCheck size={22} />

                            <div>

                                <strong>

                                    Secure & Encrypted

                                </strong>

                                <span>

                                    Bank-level security

                                </span>

                            </div>

                        </div>

                        <div className="wallet-id">

                            <span>

                                Wallet ID

                            </span>

                            <strong>

                                #BR-7845-0921

                            </strong>

                        </div>

                    </div>

                </section>

                <section className="wallet-main-grid">

                    <article className="wallet-balance-card">

                        <div className="wallet-balance-content">

                            <span className="wallet-balance-label">

                                <WalletIcon size={18} />

                                Available Balance

                            </span>

                            <h2 className="wallet-balance">

                                R {balance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}

                            </h2>

                            <p className="wallet-last-update">

                                <Clock3 size={16} />

                                Last updated: Just now

                            </p>

                            {message && (

                                <div className="wallet-message">

                                    {message}

                                </div>

                            )}

                            <div className="wallet-actions">

                                <button
                                    className="wallet-add-button"
                                    type="button"
                                >

                                    <Plus size={18} />

                                    Add Funds

                                </button>

                                <button
                                    className="wallet-send-button"
                                    type="button"
                                    disabled
                                >

                                    <Send size={18} />

                                    Send Money

                                </button>

                            </div>

                        </div>

                        <div className="wallet-balance-image">

                            <img
                                src="/images/wallet-hero.png"
                                alt="Blue Reserve Wallet"
                            />

                        </div>

                    </article>
                    <section className="wallet-side-panel">

                        <article className="wallet-fund-card">

                            <div className="wallet-card-header">

                                <WalletIcon size={22} />

                                <div>

                                    <h3>

                                        Quick Add Funds

                                    </h3>

                                    <p>

                                        Top up your wallet instantly

                                    </p>

                                </div>

                            </div>

                            <form
                                onSubmit={fundWallet}
                                className="wallet-fund-form"
                            >

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="R 0.00"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(e.target.value)
                                    }
                                    className="wallet-amount-input"
                                />

                                <div className="wallet-quick-amounts">

                                    {[100, 250, 500, 1000].map((value) => (

                                        <button
                                            key={value}
                                            type="button"
                                            className="wallet-amount-chip"
                                            onClick={() =>
                                                setAmount(value.toString())
                                            }
                                        >

                                            R{value}

                                        </button>

                                    ))}

                                </div>

                                <button
                                    type="submit"
                                    className="wallet-submit-button"
                                >

                                    <Plus size={18} />

                                    Add Funds Securely

                                </button>

                                <p className="wallet-security-note">

                                    <ShieldCheck size={16} />

                                    Your payment information is
                                    protected with bank-level
                                    encryption.

                                </p>

                            </form>

                        </article>

                        <article className="wallet-transactions-card">

                            <div className="wallet-card-header wallet-space-between">

                                <div className="wallet-card-title">

                                    <Clock3 size={22} />

                                    <div>

                                        <h3>

                                            Recent Transactions

                                        </h3>

                                        <p>

                                            Latest wallet activity

                                        </p>

                                    </div>

                                </div>

                                <button
                                    className="wallet-view-all"
                                    type="button"
                                >

                                    View All

                                </button>

                            </div>

                            <div className="wallet-transaction-list">

                                <div className="wallet-transaction">

                                    <div className="wallet-transaction-left">

                                        <div className="wallet-transaction-icon wallet-success">

                                            <Plus size={18} />

                                        </div>

                                        <div>

                                            <strong>

                                                Added Funds

                                            </strong>

                                            <span>

                                                From Visa •••• 4242

                                            </span>

                                            <small>

                                                16 May 2025, 10:42

                                            </small>

                                        </div>

                                    </div>

                                    <strong className="wallet-credit">

                                        +R 1 000.00

                                    </strong>

                                </div>

                                <div className="wallet-transaction">

                                    <div className="wallet-transaction-left">

                                        <div className="wallet-transaction-icon wallet-warning">

                                            <WalletIcon size={18} />

                                        </div>

                                        <div>

                                            <strong>

                                                Purchase

                                            </strong>

                                            <span>

                                                Order #BR-8891

                                            </span>

                                            <small>

                                                15 May 2025, 16:25

                                            </small>

                                        </div>

                                    </div>

                                    <strong className="wallet-debit">

                                        -R 650.00

                                    </strong>

                                </div>

                                <div className="wallet-transaction">

                                    <div className="wallet-transaction-left">

                                        <div className="wallet-transaction-icon wallet-success">

                                            <Plus size={18} />

                                        </div>

                                        <div>

                                            <strong>

                                                Added Funds

                                            </strong>

                                            <span>

                                                From Mastercard •••• 5555

                                            </span>

                                            <small>

                                                12 May 2025, 09:15

                                            </small>

                                        </div>

                                    </div>

                                    <strong className="wallet-credit">

                                        +R 500.00

                                    </strong>

                                </div>

                                <div className="wallet-transaction">

                                    <div className="wallet-transaction-left">

                                        <div className="wallet-transaction-icon wallet-warning">

                                            <WalletIcon size={18} />

                                        </div>

                                        <div>

                                            <strong>

                                                Purchase

                                            </strong>

                                            <span>

                                                Order #BR-8452

                                            </span>

                                            <small>

                                                10 May 2025, 14:10

                                            </small>

                                        </div>

                                    </div>

                                    <strong className="wallet-debit">

                                        -R 230.00

                                    </strong>

                                </div>

                            </div>

                        </article>

                    </section>

                    <section className="wallet-overview">

                        <div className="wallet-overview-header">

                            <h2>

                                Wallet Overview

                            </h2>

                            <p>

                                Your financial dashboard at a glance

                            </p>

                        </div>

                        <div className="wallet-overview-grid">

                            <article className="wallet-stat-card">

                                <span>Total Additions</span>

                                <h3>R 5 860.00</h3>

                                <small>This Month</small>

                            </article>

                            <article className="wallet-stat-card">

                                <span>Total Spending</span>

                                <h3>R 3 423.96</h3>

                                <small>This Month</small>

                            </article>

                            <article className="wallet-stat-card">

                                <span>Transactions</span>

                                <h3>24</h3>

                                <small>This Month</small>

                            </article>

                            <article className="wallet-stat-card">

                                <span>Rewards Earned</span>

                                <h3>R 245.60</h3>

                                <small>This Month</small>

                            </article>

                        </div>

                    </section>
                    <section className="wallet-rewards-banner">

                        <div className="wallet-rewards-content">

                            <span className="wallet-rewards-tag">

                                Exclusive to Blue Reserve

                            </span>

                            <h2>

                                Add funds and earn 2.5% rewards

                            </h2>

                            <p>

                                The more you add to your wallet,
                                the more exclusive rewards and
                                member benefits you unlock.

                            </p>

                            <button
                                type="button"
                                className="wallet-learn-button"
                            >

                                Learn More

                            </button>

                        </div>

                        <div className="wallet-rewards-image">

                            <img
                                src="/images/rewards-banner.png"
                                alt="Blue Reserve Collection"
                            />

                        </div>

                    </section>

                    <section className="wallet-footer">

                        <article className="wallet-footer-item">

                            <div className="wallet-footer-icon">

                                <WalletIcon size={24} />

                            </div>

                            <div>

                                <strong>

                                    Instant Top-ups

                                </strong>

                                <span>

                                    Funds reflect immediately

                                </span>

                            </div>

                        </article>

                        <article className="wallet-footer-item">

                            <div className="wallet-footer-icon">

                                <ShieldCheck size={24} />

                            </div>

                            <div>

                                <strong>

                                    Bank-level Security

                                </strong>

                                <span>

                                    Your money is protected

                                </span>

                            </div>

                        </article>

                        <article className="wallet-footer-item">

                            <div className="wallet-footer-icon">

                                <Send size={24} />

                            </div>

                            <div>

                                <strong>

                                    24/7 Support

                                </strong>

                                <span>

                                    We're here whenever you need us

                                </span>

                            </div>

                        </article>

                    </section>

                </section>

            </section>

            </Layout>

        );
    
}

export default Wallet;