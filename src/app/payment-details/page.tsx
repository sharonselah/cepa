import React from "react";

const PaymentDetails = () => {
    return (
        <div className="col-span-12 min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-left">Payment Details</h2>
                <p className="text-sm text-gray-600 mb-6 text-left">
                    Deposit your funds in one of the following payment channels.t Your balance will be updated once the payment is verified.
                </p>

                {/* Payment Options */}
                <div className="space-y-4 text-sm">
                    <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center">
                        <div className='space-y-2'>
                            <h3 className="text-lg font-semibold">🏦 Bank Transfer</h3>
                            <p className="text-sm text-gray-600">Bank Name: Equity Bank</p>
                            <p className="text-sm text-gray-600">Account No: 1234567898786</p>
                        </div>

                        <div>
                            <button className="bg-maroon-100 text-white px-4 py-2 rounded-lg min-w-40">
                                Deposit Instructions
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center">
                        <div className='space-y-2'>
                            <h3 className="text-lg font-semibold">🔗 Metamask Transfer</h3>
                            <p className="text-sm text-gray-600">Wallet Address: 0xABC...123</p>
                            <p className="text-sm text-gray-600">Currency: USD</p>
                        </div>

                        <div>
                            <button className="bg-maroon-100 text-white px-4 py-2 rounded-lg min-w-40">
                                Deposit Funds
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-300 p-4 rounded-lg flex justify-between items-center">
                        <div className='space-y-2'>
                            <h3 className="text-lg font-semibold">💰 Wire Transfer</h3>
                            <p className="text-sm text-gray-600">Currency: USD</p>
                        </div>

                        <div>
                            <button className="bg-maroon-100 text-white px-4 py-2 rounded-lg min-w-40">
                                Deposit Instructions
                            </button>
                        </div>
                    </div>

                   

                   
                </div>

                
            </div>
        </div>
    );
};

export default PaymentDetails;
