import React from 'react';
import { Check, Star, ArrowRight, Users, TrendingUp, Award, Shield, Phone, Mail } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  UPDATED DATA WITH ALL RECOMMENDED CHANGES                         */
/* ------------------------------------------------------------------ */

const packageDetails = [
  {
    id: 'foundation',
    name: 'Foundation Bundle',
    monthly: '₹2,999', // UPDATED: Increased from ₹1,999
    setup: '₹2,499',   // UPDATED: Decreased from ₹4,999
    originalPrice: '₹3,499', // UPDATED: Adjusted original price
    tag: 'Perfect Start',
    color: 'from-emerald-600 to-teal-600',
    tagColor: 'bg-emerald-600',
    icon: <Users className="w-6 h-6" />,
    description: 'Perfect for small businesses starting their digital journey with essential tools',
    highlight: 'Get online in just 7 days',
    savings: 'Save ₹500/month',
    roi: '300% ROI in 6 months',
    features: [
      '3-page professional website (Home, About, Contact)',
      'Basic logo design + 1 revision',
      'WhatsApp button integration',
      'Google My Business setup & optimization',
      '3 GMB posts monthly',
      '1 local keyword optimization',
      'Basic review management templates',
      'Mobile-responsive design',
      'SSL certificate & hosting setup',
      'Basic on-page SEO',
      'Contact form integration',
      'Google Analytics setup'
    ],
    bonus: ['Free domain for 1 year', '24/7 website monitoring', 'Free SSL certificate']
  },
  {
    id: 'authority',
    name: 'Authority Dominator',
    monthly: '₹3,999',
    setup: '₹7,999',
    originalPrice: '₹5,499',
    tag: 'Most Popular',
    color: 'from-indigo-600 to-purple-600',
    tagColor: 'bg-indigo-600',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Complete digital presence with social media management and brand building',
    highlight: 'Dominate your local market',
    savings: 'Save ₹1,500/month',
    roi: '500% ROI in 4 months',
    features: [
      '5-page professional website with advanced features',
      'Professional logo + branding kit + 1 revision',
      'WhatsApp integration with 2 message templates',
      'Google My Business optimization & management',
      '6 GMB posts monthly with professional graphics',
      '3 local keywords optimization',
      'Monthly review management & reporting',
      'Social media management (2 platforms)',
      '12 posts + 2 reels monthly',
      '1 professional photoshoot quarterly', // UPDATED: Changed from monthly to quarterly
      'Content calendar & strategy',
      'Basic competitor analysis',
      'Monthly performance report',
      'WhatsApp marketing templates', // UPDATED: Replaced email marketing
      'Google Ads consultation', // UPDATED: Added Google Ads consultation
      'Advanced SEO optimization'
    ],
    bonus: ['Free social media audit', 'Dedicated account manager', 'Monthly strategy call', 'Priority support']
  },
  {
    id: 'market',
    name: 'Market Conqueror',
    monthly: '₹7,999', // UPDATED: Increased from ₹5,999
    setup: '₹14,999',
    originalPrice: '₹10,999', // UPDATED: Adjusted original price
    tag: 'Enterprise',
    color: 'from-yellow-500 to-amber-500',
    tagColor: 'bg-yellow-600',
    icon: <Award className="w-6 h-6" />,
    description: 'Complete digital dominance with Basic Local Magnet System included', // UPDATED: Description
    highlight: 'Conquer your entire market',
    savings: 'Save ₹3,000/month',
    roi: '800% ROI in 3 months',
    features: [
      '7-8 page comprehensive website with e-commerce ready',
      'Full branding kit + logo + 3 revisions',
      'WhatsApp Business API with auto-reply integration',
      'Advanced Google My Business with 12 posts monthly',
      '5 local keywords + competitor tracking',
      'Automated review management + reminders',
      'Social media management (3 platforms)',
      '16 posts + 4 reels monthly',
      '1 professional photoshoot monthly',
      'Basic Local Magnet System:', // UPDATED: Simplified from multiple campaigns
      '• Local business directory submissions',
      '• Basic lead capture forms & tracking',
      '• 1 conversion-optimized landing page',
      '• GMB lead tracking integration',
      '• Basic competitor monitoring',
      'Advanced analytics dashboard',
      'Monthly strategy consultation call',
      'Priority support & dedicated account manager'
    ],
    bonus: ['Free competitor analysis report', 'VIP support line', 'Quarterly business review', 'Basic Local Magnet System included']
  }
];

// ADDED: Premium Add-Ons Section
const premiumAddOns = [
  {
    name: 'Advanced Google Ads Management',
    price: '₹7,999/month',
    description: 'Complete Google Ads campaign management with optimization'
  },
  {
    name: 'CRM + Marketing Automation',
    price: '₹2,999/month', 
    description: 'Advanced customer relationship management and automation'
  },
  {
    name: 'Professional Monthly Photoshoot',
    price: '₹4,999/month',
    description: 'Professional photography for social media and website'
  },
  {
    name: 'Advanced Analytics Dashboard',
    price: '₹1,999/month',
    description: 'Comprehensive analytics and reporting dashboard'
  }
];

const trustBadges = [
  { icon: <Shield className="w-5 h-5" />, text: '100% Money Back Guarantee' },
  { icon: <Star className="w-5 h-5" />, text: '500+ Happy Clients' },
  { icon: <Award className="w-5 h-5" />, text: 'Google Partner Certified' }
];

/* ------------------------------------------------------------------ */
/*  UPDATED COMPONENT WITH ALL CHANGES                                */
/* ------------------------------------------------------------------ */

const PackagesDetails = () => (
  <section className="min-h-screen py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 relative overflow-x-hidden">
    {/* Decorative elements */}
    <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600 opacity-10 rounded-full filter blur-3xl animate-pulse pointer-events-none" />
    <div className="absolute top-1/4 -right-20 w-64 h-64 bg-emerald-600 opacity-10 rounded-full filter blur-3xl animate-pulse pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 opacity-10 rounded-full filter blur-3xl animate-pulse pointer-events-none" />
    
    <div className="relative z-10 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 hover:border-indigo-400/50 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 backdrop-blur-sm mb-8"
          aria-label="Go back"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </button><br />
        
        {/* ADDED: 15-Day Free Trial Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 font-medium mb-6 backdrop-blur-sm">
          <Star className="w-4 h-4" />
          15-Day FREE Trial • No Setup Fee During Trial
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          What You Get in Each&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Package
          </span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Every feature, every service, every benefit—crystal clear and transparent. 
          <span className="text-indigo-400 font-medium"> Start with 15-day free trial, pay only when you see results.</span>
        </p>

    
       
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch mb-20">
        {packageDetails.map((pkg, index) => (
          <div
            key={pkg.id}
            className={`flex flex-col border-2 border-gray-800 rounded-3xl bg-gray-900/70 backdrop-blur-sm transition-all duration-300 hover:border-gray-700 hover:shadow-2xl ${index === 1 ? 'shadow-purple-500/20 transform scale-105' : 'shadow-black/20'}`}
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <span className={`${pkg.tagColor} px-4 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2`}>
                  {pkg.icon}
                  {pkg.tag}
                </span>
                {index === 1 && (
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black animate-pulse whitespace-nowrap">
                    BEST VALUE
                  </div>
                )}
              </div>
              <h2 className="text-3xl font-bold text-white mt-4">{pkg.name}</h2>
              <p className="text-gray-400 mt-2 h-12">{pkg.description}</p>
            </div>

            {/* Pricing */}
            <div className="p-6 bg-white/5 border-y border-gray-800">
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${pkg.color}`}>{pkg.monthly}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
              <div className="text-sm text-green-400 font-medium">{pkg.savings}</div>
              <div className="mt-3">
                <span className="text-lg font-bold text-white">{pkg.setup}</span>
                <span className="text-gray-400"> setup (after trial)</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                💡 15-day free trial • Setup fee only if you continue
              </div>
            </div>

            {/* Features */}
            <div className="p-6 flex-grow">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included:</h3>
              <ul className="space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center mt-0.5 flex-shrink-0 shadow-lg`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bonus & CTA */}
            <div className="p-6 mt-auto">
              {pkg.bonus && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20">
                  <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Exclusive Bonuses
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {pkg.bonus.map((bonus, bonusIndex) => (
                      <div key={bonusIndex} className="flex items-center gap-2 text-indigo-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        <span>{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => window.open(`https://wa.me/917452877151?text=Hi, I want to start the 15-day FREE TRIAL for ${pkg.name} package`, '_blank')}
                  className={`cursor-pointer w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r ${pkg.color} hover:shadow-xl hover:scale-105 transform transition-all duration-300`}
                >
                  Start 15-Day FREE Trial
                </button>
                <button
                  onClick={() => window.open(`tel:+917452877151`, '_self')}
                  className="cursor-pointer w-full py-3 px-4 rounded-xl font-medium text-gray-300 border-2 border-gray-600 hover:border-gray-500 hover:text-white transition-all duration-300"
                >
                  Call for Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADDED: Premium Add-Ons Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Add-Ons</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scale your success with our premium services. Add these to any package for maximum growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumAddOns.map((addon, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-2">{addon.name}</h3>
              <div className="text-2xl font-bold text-yellow-400 mb-3">{addon.price}</div>
              <p className="text-gray-400 text-sm">{addon.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="text-center">
        <div className="relative bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-pink-900/50 rounded-3xl p-12 border border-gray-700/50 backdrop-blur-sm overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/30 border border-indigo-400/50 text-indigo-200 font-medium mb-6">
              <Phone className="w-4 h-4" />
              Free 15-Minute Consultation
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still Not Sure Which Package is Right for You?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's have a quick consultation to understand your business needs and recommend the perfect package.
              <br />
              <span className="text-sm text-gray-400 mt-2 block">No commitment required • 100% FREE • Expert guidance</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.open('tel:+917452877151', '_self')}
                className="cursor-pointer group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 transform transition-all duration-300 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now for Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => window.open('https://wa.me/917452877151?text=Hi, I need help choosing the right digital marketing package for my business', '_blank')}
                className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 border-2 border-indigo-500/50 text-indigo-300 font-semibold rounded-xl hover:border-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.306"/>
                </svg>
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Custom CSS for animations */}
    <style jsx>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
      }
    `}</style>
  </section>
);

export default PackagesDetails;
