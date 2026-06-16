import { Gift } from 'lucide-react';
import { useState } from 'react';

export default function LeadMagnet() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append('ml-submit', '1');
      formData.append('anticsrf', 'true');

      const response = await fetch('https://assets.mailerlite.com/jsonp/2236546/forms/183498968634754557/subscribe', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-teal-100 shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-full p-4 shadow-md">
          <Gift className="w-8 h-8 text-teal-600" />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">
        Stop Overpaying for Heating & Cooling.
      </h2>

      <p className="text-base md:text-lg text-slate-600 mb-6 text-center max-w-2xl mx-auto leading-relaxed">
        The most expensive HVAC repair is the one that catches you off guard in July. Get our free HVAC Maintenance & Savings Checklist — seasonal checklists for central AC, furnaces, and ductless mini-splits, a complete filter selection guide, and the 5 questions to ask your technician before agreeing to any repair or replacement.
      </p>

      <div className="max-w-md mx-auto">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Get Free Checklist'}
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
            <p className="text-slate-600 mb-4">You have successfully joined our subscriber list.</p>
            <p className="text-sm text-slate-500">Check your email for the HVAC Maintenance & Savings Checklist.</p>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 text-center mt-4">
        Free download. No spam, ever.
      </p>
    </div>
  );
}
