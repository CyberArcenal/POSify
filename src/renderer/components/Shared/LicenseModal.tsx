import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

interface LicenseModalProps {
  onAccept: () => void;
  onCommercialRequest: () => void;
}

export function LicenseModal({ onAccept, onCommercialRequest }: LicenseModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem('tillify_license_accepted');
    if (accepted === 'true') {
      setIsOpen(false);
      onAccept();
    }
  }, [onAccept]);

  const handleAccept = () => {
    localStorage.setItem('tillify_license_accepted', 'true');
    setIsOpen(false);
    onAccept();
  };

  const handleCommercial = () => {
    onCommercialRequest();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full border border-slate-700 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Tillify License Agreement</h2>
          </div>
          <button
            onClick={handleAccept}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <div className="space-y-5 text-slate-300">
            <p>
              Tillify is <strong className="text-white">dual‑licensed</strong> under the Apache License 2.0 (open source)
              or a separate Commercial License for proprietary use.
            </p>

            <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-white text-lg mb-1">📖 Open Source Terms (Apache 2.0)</h3>
              <p className="text-sm">
                You may use, modify, and distribute Tillify for free under the Apache 2.0 license,
                provided you retain all copyright notices and disclaimers.
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border-l-4 border-amber-500">
              <h3 className="font-semibold text-white text-lg mb-1">💼 Commercial License</h3>
              <p className="text-sm">
                If you intend to use Tillify in a proprietary environment, for a business that generates revenue,
                or require enterprise support, you must purchase a Commercial License.
              </p>
            </div>

            <div className="bg-slate-900/30 rounded-lg p-4 text-sm">
              <h3 className="font-semibold text-white">⚠️ Disclaimer of Warranty</h3>
              <p className="text-slate-400">
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </div>

            <div className="bg-slate-900/30 rounded-lg p-4 text-sm">
              <h3 className="font-semibold text-white">⚖️ Limitation of Liability</h3>
              <p className="text-slate-400">
                IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
                DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
                ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 p-5 border-t border-slate-700 bg-slate-900/30 rounded-b-xl">
          <button
            onClick={handleCommercial}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors font-medium"
          >
            <Mail className="w-4 h-4" />
            Need Commercial License?
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
          >
            I Accept (Open Source Terms)
          </button>
        </div>
      </div>
    </div>
  );
}