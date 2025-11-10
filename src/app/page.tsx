import Image from "next/image";
import {ArrowDown, FileText, Music} from "lucide-react";

export default function Home() {
  return (
        <div className="min-h-screen bg-gloss-cream">
            <nav className="bg-white border-b border-gloss-offwhite py-4 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Music className="w-8 h-8 text-gloss-navy" />
                        <span className="text-2xl font-serif font-bold text-gloss-navy">GLOSS</span>
                    </div>
                </div>
            </nav>

            <section className="relative bg-gradient-to-br from-gloss-navy via-gloss-blue to-gloss-accent py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Grainger Library of Sampled Sound
                    </h1>
                    <p className="text-xl md:text-2xl text-gloss-offwhite font-body-serif mb-8 max-w-3xl mx-auto">
                        Expanding accessibility in sound and music for neurodivergent individuals
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="#announcement"
                            className="inline-flex items-center gap-2 text-white hover:text-gloss-gold transition-colors"
                        >
                            <span className="font-body-serif">Learn more</span>
                            <ArrowDown className="w-5 h-5 animate-bounce" />
                        </a>
                    </div>
                </div>
            </section>

            <section id="announcement" className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gloss-navy mb-4">
                            New Appointment
                        </h2>
                        <div className="w-24 h-1 bg-gloss-gold mx-auto"></div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-xl text-gloss-slate font-body-serif leading-relaxed mb-6">
                            We are delighted to announce the appointment of <span className="font-semibold text-gloss-navy">Professor Andrew Hugill</span> as the Project Consultant for the Grainger Library of Sampled Sound (GLOSS).
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-gloss-offwhite">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gloss-navy mb-4">
                            Our Mission
                        </h2>
                        <div className="w-24 h-1 bg-gloss-gold mx-auto"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12">
                        <p className="text-xl text-gloss-slate font-body-serif leading-relaxed mb-6">
                            The current project is directed at expanding GLOSS for use by neurodivergent people working in sound and music. This encompasses a wide spectrum of individuals with unique cognitive profiles, including autism, ADHD, dyslexia, and other neurological differences.
                        </p>
                        <p className="text-xl text-gloss-slate font-body-serif leading-relaxed">
                            Their needs often include tailored approaches to learning, sensory sensitivity considerations, and support in navigating the complexities of music and composing.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-gloss-cream hover:bg-gloss-offwhite rounded-xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-gloss-navy rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Music className="w-8 h-8 text-gloss-gold" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gloss-navy mb-3">
                                Explore
                            </h3>
                            <p className="text-gloss-slate font-body-serif leading-relaxed">
                                Discover the collection of sampled sounds and musical resources available through GLOSS.
                            </p>
                        </div>
                        <div className="bg-gloss-cream hover:bg-gloss-offwhite rounded-xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-gloss-accent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gloss-navy mb-3">
                                Who was Percy Grainger?
                            </h3>
                            <p className="text-gloss-slate font-body-serif leading-relaxed">
                                Learn about the pioneering composer, ethnomusicologist, and innovator behind this collection.
                            </p>
                        </div>

                        <div className="bg-gloss-cream hover:bg-gloss-offwhite rounded-xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-gloss-sage rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gloss-navy mb-3">
                                Making of GLOSS
                            </h3>
                            <p className="text-gloss-slate font-body-serif leading-relaxed">
                                Explore the development process and vision behind creating this accessible sound library.
                            </p>
                        </div>

                        <div className="bg-gloss-cream hover:bg-gloss-offwhite rounded-xl p-8 shadow-md hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-gloss-gold rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-gloss-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gloss-navy mb-3">
                                Grainger as an Innovator
                            </h3>
                            <p className="text-gloss-slate font-body-serif leading-relaxed">
                                Discover how Grainger's forward-thinking approach revolutionized music and sound collection.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-gloss-navy">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        A Ground-Breaking Project
                    </h2>
                    <p className="text-xl text-gloss-offwhite font-body-serif mb-10 max-w-2xl mx-auto">
                        Learn more about this innovative initiative to make music and sound creation accessible to neurodivergent individuals.
                    </p>
                    <a
                        href="https://percygrainger.org/resources/Final%20Press%20Release-GLOSS.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gloss-gold hover:bg-opacity-90 text-gloss-dark font-serif font-semibold px-10 py-5 rounded-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                    >
                        <FileText className="w-6 h-6" />
                        Download Press Release
                    </a>
                </div>
            </section>

            <footer className="bg-gloss-dark text-gloss-muted py-10 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="font-body-serif">
                        © 2024 Percy Grainger Society. All rights reserved.
                    </p>
                    <p className="font-body-serif text-sm mt-2 text-gloss-muted">
                        Grainger Library of Sampled Sound (GLOSS)
                    </p>
                </div>
            </footer>
        </div>
    );
}
