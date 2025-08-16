'use client';

interface Resume {
  id: string;
  title: string;
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    companies: string[];
    startYear: string;
    endYear: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills?: {
    id: string;
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

interface ResumeDisplayProps {
  resume: Resume;
}

export default function ResumeDisplay({ resume }: ResumeDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{resume.title}</h2>
        <p className="text-gray-600 leading-relaxed">{resume.summary}</p>
      </div>

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Experience</h3>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                  <span className="text-sm text-gray-500">
                    {exp.startYear} - {exp.endYear}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.companies.join(', ')}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index} className="text-sm text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Education</h3>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.skills.technical && resume.skills.technical.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.soft && resume.skills.soft.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-2">Projects</h3>
          <div className="space-y-4">
            {resume.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{project.name}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Project →
                    </a>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
