import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Mail, Heart, Scale, AlertTriangle } from 'lucide-react';

const electron = (window as any).electron;

export function Help() {
  const navigate = useNavigate();
  const [licenseType, setLicenseType] = useState<'open' | 'commercial'>('open');
  const [licensedTo, setLicensedTo] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('tillify_license_type');
    if (stored === 'commercial') {
      setLicenseType('commercial');
      setLicensedTo(localStorage.getItem('tillify_licensed_to'));
    }
  }, []);

  const openExternal = (url: string) => {
    if (electron?.openExternal) {
      electron.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={goBack}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-white">Help & Legal Information</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* License Status Card */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">License Status</h2>
          </div>
          {licenseType === 'commercial' ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold flex items-center gap-2">
                ✅ Commercial License – Licensed to: <span className="text-white">{licensedTo || 'Enterprise User'}</span>
              </p>
            </div>
          ) : (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 font-semibold flex items-center gap-2">
                📖 Open Source License (Apache 2.0)
              </p>
              <p className="text-slate-300 text-sm mt-2">
                You are free to use, modify, and distribute Tillify under the terms of the Apache 2.0 license.
              </p>
            </div>
          )}
        </div>

        {/* Licensing Section */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Licensing</h2>
          </div>
          <p className="text-slate-300 mb-4">
            Tillify is dual‑licensed. You are currently using it under the{' '}
            {licenseType === 'commercial' ? 'Commercial License' : 'Apache 2.0 open source license'}.
          </p>
          <button
            onClick={() => openExternal('https://github.com/CyberArcenal/Tillify/blob/main/LICENSE')}
            className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
          >
            Read full Apache 2.0 License →
          </button>

          {licenseType === 'open' && (
            <div className="mt-6 bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-4">
              <p className="font-medium text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Need a Commercial License?
              </p>
              <p className="text-slate-300 text-sm mt-1">
                If you use Tillify for proprietary business operations or require support,
                please contact us to purchase a commercial license.
              </p>
              <button
                onClick={() => openExternal('mailto:cyberarcenal1@gmail.com?subject=Commercial%20License%20Inquiry')}
                className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                Contact Sales
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Disclaimer of Warranty & Liability</h2>
          </div>
          <div className="bg-slate-900/70 rounded-lg p-4 text-sm font-mono text-slate-400 border border-slate-700">
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
            INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
            IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
            DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
            ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE.
          </div>
        </div>

        {/* Attribution */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Attribution</h2>
          </div>
          <p className="text-slate-300">
            Powered by <strong className="text-white">Tillify POS</strong> –{' '}
            <button
              onClick={() => openExternal('https://github.com/CyberArcenal/Tillify')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              https://github.com/CyberArcenal/Tillify
            </button>
          </p>
          <p className="text-slate-500 text-sm mt-2">Original author: CyberArcenal</p>
        </div>

        {/* Contact */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Commercial Inquiries & Support</h2>
          </div>
          <p className="text-slate-300">
            Email:{' '}
            <a href="mailto:cyberarcenal1@gmail.com" className="text-blue-400 hover:text-blue-300">
              cyberarcenal1@gmail.com
            </a>
          </p>
          <p className="text-slate-500 text-sm mt-3">
            For enterprise support, custom development, or white‑label licensing, please reach out.
          </p>
        </div>
      </div>
    </div>
  );
}