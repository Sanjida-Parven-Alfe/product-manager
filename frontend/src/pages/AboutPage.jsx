import { Heart, Target, Rocket, Users, ChevronRight, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-32">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6">
                <Heart size={14} fill="currentColor" />
                <span>Our Story</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8">
                Helping teams <span className="text-gradient">Scale</span> their
                catalog.
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-10">
                Shelve was born from a simple idea: that managing a product
                catalog should be as beautiful as the products themselves. We've
                built a workspace where precision meets creativity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" icon={ChevronRight}>
                  Join Our Mission
                </Button>
                <button className="px-8 h-14 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative glass rounded-[3rem] p-4 border-white/50 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Our Team"
                  className="w-full h-[500px] object-cover rounded-[2.5rem]"
                />
              </div>
            </div>
          </div>

          {/* Mission / Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              {
                icon: <Target className="text-indigo-600" />,
                title: "Our Mission",
                desc: "To democratize high-end product management tools for businesses of all sizes.",
              },
              {
                icon: <Users className="text-emerald-600" />,
                title: "User Centric",
                desc: "Every pixel is designed with the user's workflow and efficiency in mind.",
              },
              {
                icon: <Rocket className="text-rose-600" />,
                title: "Innovation First",
                desc: "Continuously pushing boundaries with modern stacks and efficient architecture.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {v.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)]" />
            <h2 className="text-white text-4xl md:text-5xl font-black mb-8 relative z-10 tracking-tight">
              Ready to start your journey?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
              <Button size="lg">Create Account</Button>
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <Mail size={18} />
                <span>hello@shelve.io</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
