import React from "react";

const sampleDocuments = [
  {
    id: 1,
    title: "Advanced AI Ethics Overview",
    type: "PDF",
    summary: "An executive summary of ethical guidelines and governance frameworks for AI systems, curated from recent research and regulatory sources.",
    link: "#",
  },
  {
    id: 2,
    title: "Deep Learning Study Notes",
    type: "Notes",
    summary: "Concise notes covering transformer architectures, training best practices, and grounded reasoning techniques used by the AI agent.",
    link: "#",
  },
  {
    id: 3,
    title: "Market Research Report",
    type: "PDF",
    summary: "A grounded source report highlighting industry trends, validated by Foundry IQ and summarized for quick review.",
    link: "#",
  },
];

const ResourceHub = () => {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <p style={styles.subtitle}>Grounded Study Links</p>
          <h1 style={styles.title}>Resource Hub</h1>
        </div>
        <p style={styles.description}>
          Browse verified grounded documents retrieved by the AI Agent. Each source includes a verified summary and a direct link to the grounded content.
        </p>
      </div>

      <div style={styles.grid}>
        {sampleDocuments.map((document) => (
          <div key={document.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>{document.title}</h2>
              <span style={styles.badge}>{document.type}</span>
            </div>
            <p style={styles.snippet}>{document.summary}</p>
            <a href={document.link} style={styles.button}>
              View Grounded Source (Foundry IQ Verified)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px",
    backgroundColor: "#f7fafc",
    color: "#1f2937",
    fontFamily: "Inter, sans-serif",
  },
  header: {
    maxWidth: "920px",
    margin: "0 auto 32px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
  },
  subtitle: {
    margin: 0,
    color: "#6366f1",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.78rem",
  },
  title: {
    margin: "12px 0 0",
    fontSize: "2rem",
    lineHeight: 1.1,
  },
  description: {
    marginTop: "18px",
    color: "#4b5563",
    lineHeight: 1.7,
    maxWidth: "720px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    maxWidth: "1120px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "240px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "18px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "1.15rem",
    lineHeight: 1.4,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: "#eef2ff",
    color: "#4338ca",
    fontSize: "0.8rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },
  snippet: {
    color: "#475569",
    lineHeight: 1.75,
    margin: "0 0 20px",
    flexGrow: 1,
  },
  button: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "12px",
    backgroundColor: "#4338ca",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: 600,
    textAlign: "center",
  },
};

export default ResourceHub;
