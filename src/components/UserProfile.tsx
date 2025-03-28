import { useState } from 'react';
import { useParams } from 'react-router-dom';
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  location: string;
  bio: string;
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];  // Fixed from skillToLearn to skillsToLearn
  rating: number;
}  // Added missing closing brace

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency?: string;
  desire?: string;
}


const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState<'teach' | 'learn'>('teach');

  // Mock data - in a real app, this would come from an API
  const [profile, setProfile] = useState<UserProfile>({
    id: userId || '1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Paris, France',
    bio: 'Digital designer and language enthusiast. Love sharing knowledge and learning new things!',
    rating: 4.7,
    skillsToTeach: [
      { id: '1', name: 'UI/UX Design', category: 'Design', proficiency: 'Advanced' },
      { id: '2', name: 'Figma', category: 'Design', proficiency: 'Expert' },
      { id: '3', name: 'French', category: 'Language', proficiency: 'Native' },
    ],
    skillsToLearn: [
      { id: '4', name: 'React', category: 'Programming', desire: 'High' },
      { id: '5', name: 'Photography', category: 'Art', desire: 'Medium' },
      { id: '6', name: 'Spanish', category: 'Language', desire: 'High' },
    ],
  });

  const handleSkillRemove = (skillId: string, listType: 'teach' | 'learn') => {
    if (listType === 'teach') {
      setProfile(prev => ({
        ...prev,
        skillsToTeach: prev.skillsToTeach.filter(skill => skill.id !== skillId)
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        skillsToLearn: prev.skillsToLearn.filter(skill => skill.id !== skillId)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <img 
              className="h-20 w-20 rounded-full object-cover"
              src={profile.avatar}
              alt={profile.name}
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-indigo-600">{profile.location}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(profile.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-600 text-sm">{profile.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('teach')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'teach' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                I Can Teach
              </button>
              <button
                onClick={() => setActiveTab('learn')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'learn' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                I Want To Learn
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'teach' ? (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Skills I Can Teach</h3>
                {profile.skillsToTeach.length === 0 ? (
                  <p className="text-gray-500">No skills added yet</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {profile.skillsToTeach.map(skill => (
                      <li key={skill.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{skill.name}</p>
                          <p className="text-sm text-gray-500">{skill.category} • {skill.proficiency}</p>
                        </div>
                        <button
                          onClick={() => handleSkillRemove(skill.id, 'teach')}
                          className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Skill to Teach
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Skills I Want To Learn</h3>
                {profile.skillsToLearn.length === 0 ? (
                  <p className="text-gray-500">No skills added yet</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {profile.skillsToLearn.map(skill => (
                      <li key={skill.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{skill.name}</p>
                          <p className="text-sm text-gray-500">{skill.category} • Desire: {skill.desire}</p>
                        </div>
                        <button
                          onClick={() => handleSkillRemove(skill.id, 'learn')}
                          className="ml-4 text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Skill to Learn
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Message
          </button>
          <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Propose Skill Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
