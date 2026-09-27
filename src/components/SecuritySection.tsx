import React, { useState } from 'react';
import { Lock, ShieldCheck, Database, KeyRound, EyeOff, ServerOff } from 'lucide-react';
import securityImage from '../assets/images/altercode_security_vault_1790513598077.jpg';

export const SecuritySection: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="security" className="py-20 md:py-28 border-b border-[#2B3648] bg-[#121826]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Container (LHS) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#2B3648] bg-[#1A2233] shadow-2xl group">
              {!imageError ? (
                <img
                  src={securityImage}
                  alt="AlterCode SQLCipher Encrypted Security Vault on Android"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="aspect-[4/3] w-full p-8 flex flex-col justify-center items-center bg-[#151D2C]">
                  <Lock className="h-16 w-16 text-[#3B82F6] mb-4" />
                  <div className="text-base font-bold text-[#F8FAFC]">SQLCipher Hardware Vault</div>
                  <div className="text-xs text-[#94A3B8] mt-1 font-mono">256-bit AES Encryption</div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-[#121826]/90 backdrop-blur-md border border-[#2B3648] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
                <span className="text-[#34C759] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" />
                  Local SQLCipher Active
                </span>
                <span className="text-[#94A3B8]">AES-256 GCM</span>
              </div>
            </div>
          </div>

          {/* Text & Features (RHS) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA] mb-2">
              <span>Security Constitution</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Zero-Trust Client</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-4">
              Your Code Stays Yours. Encrypted at Rest, Ephemeral in Flight.
            </h2>

            <p className="text-base text-[#94A3B8] leading-relaxed mb-8">
              Developers paste sensitive proprietary logic, private tokens, and internal models. AlterCode is engineered so that your query history never touches third-party storage or persistent cloud databases.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2233] border border-[#2B3648]">
                <div className="h-9 w-9 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#60A5FA] shrink-0 mt-0.5">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">On-Device SQLCipher Encryption</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                    All saved snippets, conversion logs, and bookmarks are encrypted inside SQLite using 256-bit AES via Zetetic SQLCipher. Encryption keys are securely stored in Android's hardware Keystore via EncryptedSharedPreferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2233] border border-[#2B3648]">
                <div className="h-9 w-9 rounded-lg bg-[#34C759]/15 border border-[#34C759]/30 flex items-center justify-center text-[#34C759] shrink-0 mt-0.5">
                  <ServerOff className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">Zero Server-Side Logging & Zero CORS</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                    The Cloudflare Worker proxy acts purely as an in-memory transit pipe. It does not retain prompts or responses, logs no code snippets, and blocks web browser execution completely through zero-CORS enforcement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2233] border border-[#2B3648]">
                <div className="h-9 w-9 rounded-lg bg-[#FFCB6B]/15 border border-[#FFCB6B]/30 flex items-center justify-center text-[#FFCB6B] shrink-0 mt-0.5">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F8FAFC]">Prompt Injection & Role Sandboxing</h4>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                    All prompts are strictly clamped to 2 turns (`system` scaffold and `user` payload) with maximum character caps (10,000 chars), preventing adversarial prompt injection or model hijacking.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
