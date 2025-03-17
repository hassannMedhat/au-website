// Content Creators Page
export default function CreatorsPage() {
  return (
    <div className="creators" style={styles.container}>
      <h1 style={styles.text}>Under development...</h1>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center", // توسيط أفقي
    alignItems: "center", // توسيط عمودي
    height: "100vh", // ارتفاع كامل للشاشة
    backgroundColor: "#f0f0f0", // لون خلفية (اختياري)
  },
  text: {
    fontSize: "3rem", // حجم الخط كبير
    fontWeight: "bold", // خط عريض
    color: "#333", // لون النص (اختياري)
  },
};