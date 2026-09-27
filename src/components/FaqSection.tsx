import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Why is AlterCode only available on the Google Play Store?',
      answer:
        'AlterCode was engineered as a native Android application using Kotlin and Jetpack Compose rather than a slow web wrapper. It relies on hardware-level Android Keystore cryptographic keys and embedded SQLCipher C-binaries for local encryption. The author is actively maintaining the app on the Google Play Store to deliver uncompromising mobile performance.',
      category: 'availability',
    },
    {
      question: 'Is my private source code stored or used for AI training?',
      answer:
        'No. AlterCode enforces a zero-retention policy. Your snippets are stored locally on your device in a 256-bit AES SQLCipher database. When you run an action, the Cloudflare Worker proxy acts purely as an ephemeral memory pipe and emits zero CORS headers. Prompts and responses are discarded immediately after inference and are never logged or stored.',
      category: 'security',
    },
    {
      question: 'How does the dual AI routing (Groq & Gemini) work?',
      answer:
        'The backend worker proxy dynamically switches engines based on the developer task. For fast analysis tasks like isolating runtime bugs or generating plain-English code explanations, it routes to Groq (Llama 3.3) for sub-second (~140ms) responses. For complex code translations and architectural refactoring, it routes to Google Gemini for multi-language syntax precision.',
      category: 'architecture',
    },
    {
      question: 'Which programming languages can I convert and refactor?',
      answer:
        'AlterCode supports over 12 major languages including Kotlin, Python, TypeScript, JavaScript, Rust, Go, Swift, C++, C#, Java, PHP, and SQL. The model understands idiom conversions—such as transforming Kotlin Coroutines into Python asyncio or Rust zero-copy slices into TypeScript arrays.',
      category: 'features',
    },
    {
      question: 'Is AlterCode open source on GitHub?',
      answer:
        'Yes! The full repository including the Android Jetpack Compose client, Cloudflare Worker proxy, rate limiter durable objects, and test suite is publicly hosted on GitHub at github.com/ramzesktaplah/Altercode. Community issues and contributions are welcome.',
      category: 'availability',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-[#2B3648] bg-[#121826]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#60A5FA] mb-2">
            <span>Frequently Asked Questions</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Developer Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#94A3B8]">
            Detailed answers on distribution, security invariants, and AI inference routing.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-[#2B3648] bg-[#1A2233] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-[#F8FAFC] hover:text-[#60A5FA] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#94A3B8] transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-[#3B82F6]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#2B3648]/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
