import PropTypes from "prop-types";
import { User,Briefcase,Calendar,MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const ProfileCard = ({ name, position, company, batch, image }) => {
  return (
    <div className="card">
      <div className="card-content grid justify-items-center">
        <div className="card-image bg-white overflow-hidden -mb-28 h-56 w-48 aspect-square rounded-2xl relative z-10 shadow-xl shadow-pink-950/90 hover:scale-105 transition-all duration-300 outline outline-offset-2 outline-slate-50 border">
          <img src={image || "/placeholder.svg"} alt={name || "placeholder"}  className="w-full h-full object-cover"/>
        </div>

        <div className="card-content px-10 pt-36 max-w-96 w-80 h-80 bg-gradient-to-b from-pink-800 via-pink-800/90 to-pink-600 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-pink-950/70 transition-all duration-150 hover:scale-105 outline outline-offset-2 outline-pink-600">

          <div className="space-y-2 grid justify-items-center">
            <h3 className="text-xl font-bold text-white text-center">
               {name.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Name"}
            </h3>
            {/* <p className="text-sm font-medium text-white/80 text-center">
              {position || "Software Engineer"}
            </p> */}
            
            <p className="text-sm font-semibold text-white/80 text-center flex items-start">
               <span>
              {company.split("\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-2  text-center text-white/90 text-sm font-light flex items-start justify-center line-clamp-1">
                  {index === 0 && <Briefcase className="w-4 h-4 mr-1 mt-1" />} 
                  {index === 1 && <MapPin className="!w-4 !h-4 mr-1 " />} 
                  {paragraph}

                  </p>
                ))}
              </span>
            </p>
            <Badge className="mx-auto font-semibold hover:bg-pink-800 hover:text-white transition-all duration-300 bg-white text-pink-800 text-xs text-center">
            <Calendar className="w-4 h-4 mr-1" /> Batch {batch || "2020"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  company: PropTypes.string,
  batch: PropTypes.string,
  image: PropTypes.string,
};

export default ProfileCard;
