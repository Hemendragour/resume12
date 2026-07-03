import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 12,
    marginBottom: 18,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  title: {
    fontSize: 13,
    color: "#2563eb",
    marginTop: 4,
  },

  contact: {
    marginTop: 8,
    fontSize: 10,
    color: "#6b7280",
  },

  section: {
    marginTop: 14,
  },

  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.6,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  skill: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 9,
    borderRadius: 4,
  },
});