import { View, Text, Link } from "@react-pdf/renderer";

import { styles } from "./PdfStyles";

import type { Resume } from "../types/resume.types";

interface Props {
  resume: Resume;
}

export default function TechnicalPdfTemplate({ resume }: Props) {
  const { personalInfo } = resume;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
        <Text style={styles.title}>{personalInfo.title || "Professional"}</Text>

        {/* Improved Contact Section */}
        <View style={{ marginTop: 8 }}>
          {personalInfo.email && (
            <Text style={styles.contact}>{personalInfo.email}</Text>
          )}
          {personalInfo.phone && (
            <Text style={styles.contact}>{personalInfo.phone}</Text>
          )}
          {personalInfo.linkedIn && (
            <Text style={styles.contact}>{personalInfo.linkedIn}</Text>
          )}
          {personalInfo.github && (
            <Text style={styles.contact}>{personalInfo.github}</Text>
          )}
          {personalInfo.portfolio && (
            <Text style={styles.contact}>{personalInfo.portfolio}</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>PROFESSIONAL SUMMARY</Text>
        <Text style={styles.paragraph}>
          {resume.summary || "No summary added."}
        </Text>
      </View>

      {/* EXPERIENCE with Achievements */}
      <View style={styles.section}>
        <Text style={styles.heading}>EXPERIENCE</Text>
        {resume.experience?.length ? (
          resume.experience.map((item, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>
                {item.position}
              </Text>
              <Text style={{ fontSize: 10, color: "#555" }}>
                {item.company}
              </Text>
              <Text style={{ fontSize: 9, color: "#888" }}>
                {item.startDate} -{" "}
                {item.currentlyWorking ? "Present" : item.endDate}
              </Text>

              {/* Responsibilities */}
              {item.responsibilities?.length > 0 && (
                <>
                  {item.responsibilities.map((r, i) => (
                    <Text key={i} style={{ fontSize: 10, marginTop: 2 }}>
                      • {r}
                    </Text>
                  ))}
                </>
              )}

              {/* Achievements - NEW */}
              {item.achievements?.length ? (
                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      marginBottom: 2,
                    }}
                  >
                    Achievements
                  </Text>
                  {item.achievements.map((achievement, i) => (
                    <Text
                      key={i}
                      style={{
                        fontSize: 10,
                      }}
                    >
                      • {achievement}
                    </Text>
                  ))}
                </View>
              ) : null}
            </View>
          ))
        ) : (
          <Text style={styles.paragraph}>No experience added.</Text>
        )}
      </View>

      {/* EDUCATION */}
      <View style={styles.section}>
        <Text style={styles.heading}>EDUCATION</Text>
        {resume.education?.length ? (
          resume.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>{edu.degree}</Text>
              <Text>{edu.institution}</Text>
              {edu.fieldOfStudy && <Text>{edu.fieldOfStudy}</Text>}
              <Text style={{ fontSize: 9, color: "#777" }}>
                {edu.startYear} - {edu.endYear || "Present"}
              </Text>
              {edu.cgpa && <Text>CGPA: {edu.cgpa}</Text>}
            </View>
          ))
        ) : (
          <Text style={styles.paragraph}>No education added.</Text>
        )}
      </View>

      {/* PROJECTS */}
      <View style={styles.section}>
        <Text style={styles.heading}>PROJECTS</Text>
        {resume.projects?.length ? (
          resume.projects.map((project, index) => (
            <View key={index} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "bold" }}>{project.title}</Text>
              <Text style={{ marginTop: 3 }}>{project.description}</Text>
              {project.technologies?.length > 0 && (
                <Text style={{ marginTop: 4, fontSize: 9 }}>
                  Tech: {project.technologies.join(", ")}
                </Text>
              )}
              {project.github && <Link src={project.github}>GitHub</Link>}
              {project.link && <Link src={project.link}>Live Demo</Link>}
            </View>
          ))
        ) : (
          <Text style={styles.paragraph}>No projects added.</Text>
        )}
      </View>

      {/* SKILLS - Empty State Handled */}
      <View style={styles.section}>
        <Text style={styles.heading}>SKILLS</Text>

        {resume.skills?.length ? (
          resume.skills.map((category, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.skill}>
                <Text style={{ fontWeight: "bold" }}>{category.title}:</Text>{" "}
                {category.skills.join(", ")}
              </Text>
            </View>
          ))
        ) : (
          <Text>No skills added.</Text>
        )}
      </View>

      {/* LANGUAGES */}
      {/* <View style={styles.section}>
        <Text style={styles.heading}>LANGUAGES</Text>
        <Text>
          {resume.languages?.length
            ? resume.languages.join(", ")
            : "No languages added."}
        </Text>
      </View> */}

      {/* LANGUAGES */}
      <View style={styles.section}>
        <Text style={styles.heading}>LANGUAGES</Text>
        {resume.languages?.length ? (
          resume.languages.map((lang, index) => (
            <Text key={index} style={{ fontSize: 10, marginBottom: 2 }}>
              {lang.name} ({lang.level})
            </Text>
          ))
        ) : (
          <Text>No languages added.</Text>
        )}
      </View>

      {/* CERTIFICATIONS */}
      <View style={styles.section}>
        <Text style={styles.heading}>CERTIFICATIONS</Text>
        {resume.certifications?.length ? (
          resume.certifications.map((cert, index) => (
            <Text key={index}>• {cert}</Text>
          ))
        ) : (
          <Text>No certifications.</Text>
        )}
      </View>

      {/* AWARDS */}
      <View style={styles.section}>
        <Text style={styles.heading}>AWARDS</Text>
        {resume.awards?.length ? (
          resume.awards.map((award, index) => (
            <Text key={index}>• {award}</Text>
          ))
        ) : (
          <Text>No awards.</Text>
        )}
      </View>

      {/* INTERESTS */}
      <View style={styles.section}>
        <Text style={styles.heading}>INTERESTS</Text>
        <Text>
          {resume.interests?.length
            ? resume.interests.join(", ")
            : "No interests added."}
        </Text>
      </View>
    </>
  );
}
