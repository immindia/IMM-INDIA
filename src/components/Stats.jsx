import { Users, Calendar, GraduationCap, BookOpen, School } from 'lucide-react';
import NumberTicker from '../components/ui/number-ticker';

const Stats = () => {
  const stats = [
    { data: "70", title: "Acres of Campus", icon: School },
    { data: "22+", title: "Years of Excellence", icon: Calendar },
    { data: "10000+", title: "Alumni", icon: Users },
    { data: "20+", title: "Courses", icon: BookOpen },
  ];

  

  return (
    <section className="py-20 bg-gradient-to-l from-primary-color via-red-600 to-primary-color">
      <div className="max-w-screen-xl mx-auto px-4 text-white md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-white text-3xl font-bold sm:text-5xl">
            What our numbers say
          </h3>
          <p className="mt-3">
            Our numbers speak volumes about our commitment to excellence and growth.
          </p>
        </div>
        <div className="mt-12">
          <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x lg:divide-white/20">
            {stats.map((item, idx) => (
              <li key={idx} className="text-center px-12 md:px-16">
                <div className="text-5xl text-white font-bold flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-white mr-4" /> <NumberTicker value={item.data} className='text-5xl text-white font-bold mr-2'/>  {idx != 0 && (
                  <span className="-ml-3 text-4xl font-bold text-white font sm:text-6xl">
                    +
                  </span>
                )}
                </div>
                <p className="mt-3 font-medium">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stats;
