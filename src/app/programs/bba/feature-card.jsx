



const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow h-full group hover:translate-y-[-5px] duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-blue-50 rounded-full p-2 group-hover:bg-blue-100 transition-colors">{icon}</div>
        <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
      </div>
      <p className="text-gray-600 ml-16">{description}</p>
    </div>
  )
}

export default FeatureCard
