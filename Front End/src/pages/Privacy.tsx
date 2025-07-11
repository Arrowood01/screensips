import React from 'react';
import { Shield, Eye, Lock, Database } from 'lucide-react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - Screen Sips"
        description="Read Screen Sips Privacy Policy. Learn how we protect your data and what information we collect to provide AI-powered drinking games and cocktail recipes."
        keywords="privacy policy, Screen Sips privacy, data protection, user privacy, drinking game privacy, personal data"
        url="/privacy"
      />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="text-orange-400 mx-auto mb-4" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-amber-200/80 leading-relaxed">
              We respect your privacy and are committed to protecting your personal information
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
              <div className="flex items-center mb-4">
                <Eye className="text-orange-400 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-amber-100">Information We Collect</h2>
              </div>
              <p className="text-amber-200/80 mb-4">
                We collect minimal information to provide our service:
              </p>
              <ul className="space-y-3 text-amber-200/80">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Search queries for movie and TV show titles</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Basic analytics data to improve our service</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Voluntary feedback and support requests</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
              <div className="flex items-center mb-4">
                <Lock className="text-orange-400 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-amber-100">How We Use Your Information</h2>
              </div>
              <p className="text-amber-200/80 mb-4">
                Your information is used solely to:
              </p>
              <ul className="space-y-3 text-amber-200/80">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Generate personalized drinking games and cocktail recipes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Improve our AI algorithms and service quality</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide customer support when requested</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Analyze usage patterns to enhance user experience</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
              <div className="flex items-center mb-4">
                <Database className="text-orange-400 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-amber-100">Data Protection</h2>
              </div>
              <p className="text-amber-200/80 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="space-y-3 text-amber-200/80">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>All data is encrypted in transit and at rest</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Limited access to data on a need-to-know basis</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No sale or sharing of personal data with third parties</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
              <h2 className="text-2xl font-bold text-amber-100 mb-4">Third-Party Services</h2>
              <p className="text-amber-200/80 mb-4">
                We use trusted third-party services for:
              </p>
              <ul className="space-y-3 text-amber-200/80">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ko-fi for payment processing (with their own privacy policies)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Analytics services to understand user behavior</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>AI services for content generation</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20">
              <h2 className="text-2xl font-bold text-amber-100 mb-4">Your Rights</h2>
              <p className="text-amber-200/80 mb-4">
                You have the right to:
              </p>
              <ul className="space-y-3 text-amber-200/80">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Request access to your personal data</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Opt out of data collection where possible</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-8 border border-amber-200/20 text-center">
              <h2 className="text-2xl font-bold text-amber-100 mb-4">Questions?</h2>
              <p className="text-amber-200/80 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us through our support channels.
              </p>
              <p className="text-amber-200/60 text-sm">
                Last updated: January 15, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;