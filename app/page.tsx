// Rebuilt: 2025-01-06 18:51:00 UTC
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Trophy, Globe } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [selectedVisa, setSelectedVisa] = useState<string>('');

  const visaOptions = [
    {
      id: 'EB1A',
      title: 'EB-1A',
      subtitle: 'Extraordinary Ability',
      description: 'For individuals with extraordinary ability in sciences, arts, education, business, or athletics',
      icon: Trophy,
      color: 'from-purple-500 to-indigo-600',
      path: '/assessment/eb1a'
    },
    {
      id: 'O1A',
      title: 'O-1A',
      subtitle: 'Extraordinary Ability',
      description: 'Temporary work visa for individuals with extraordinary ability in sciences, business, education, or athletics',
      icon: Brain,
      color: 'from-blue-500 to-cyan-600',
      path: '/assessment/o1'
    },
    {
      id: 'NIW',
      title: 'NIW',
      subtitle: 'National Interest Waiver',
      description: 'For professionals whose work is in the national interest of the United States',
      icon: Globe,
      color: 'from-green-500 to-emerald-600',
      path: '/assessment/niw'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            EB-1A • O-1A • NIW
            <span className="block text-3xl md:text-5xl mt-2">Assessment Tool</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {visaOptions.map((visa, index) => {
            const Icon = visa.icon;
            return (
              <motion.div
                key={visa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(visa.path)}
                className="cursor-pointer group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-slate-200">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${visa.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {visa.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    {visa.subtitle}
                  </p>
                  <p className="text-sm text-slate-500">
                    {visa.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-4"
        >
          <p className="text-sm text-slate-600 italic">
            {`"Everywhere immigrants have enriched and strengthened the fabric of American life."`}
          </p>
          <p className="text-xs text-slate-500">
            - President John F. Kennedy
          </p>
          <p className="text-xs text-slate-400 pt-2">
            Built by Kevin Andrews • Immigration Attorney
          </p>
        </motion.div>
      </div>
    </div>
  );
}
