import React from "react";

interface ModalProps {
  onClose: () => void;
  onProceed: () => void;
}

const RestrictedPaymentModal: React.FC<ModalProps> = ({ onClose, onProceed }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-lg font-bold mb-4">Oops! This information is restricted</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please make a payment first to unlock this content.
        </p>
        <div className="flex justify-between text-sm">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg w-1/2 mx-1"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="bg-maroon-100 text-white px-4 py-2 rounded-lg w-1/2 mx-1"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestrictedPaymentModal;
