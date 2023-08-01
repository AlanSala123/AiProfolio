import "./Awards.css";

export default function Awards({ achievements, achievementList }) {
  return (
    <div
      id="achievement"
      style={{
        minHeight: achievements?.dimensions?.minHeight || '50vh',
        width: '100vw',
        backgroundColor: achievements?.background?.color,
        padding: "5vw",
        boxSizing: "border-box"
      }}
    >
      <ul style={{
        display: "flex",
        flexDirection: "column",
        textAlign: achievements?.achievementItem?.alignment?.textAlign,
        verticalAlign: achievements?.achievementItem?.alignment?.verticalAlign,
        gap: achievements?.experienceItem?.spacing || '1em',
        margin: "0",
        listStyle: "none"
      }}>
        {achievementList.map((achievement, index) => (
          <li
            key={index}
            style={{
              boxShadow: achievements?.achievementItem?.style?.boxShadow,
              borderStyle: achievements?.achievementItem?.style?.border?.borderStyle,
              borderWidth: achievements?.achievementItem?.style?.border?.borderWidth,
              borderColor: achievements?.achievementItem?.style?.border?.borderColor,
              borderRadius: achievements?.achievementItem?.style?.border?.borderRadius,
              paddingLeft: "1%",
              paddingRight: "1%",
              paddingBottom: "1%",
              marginBottom: "2%"
            }}
          >
            <h2
              style={{
                fontSize: achievements?.achievementItem?.style?.title?.fontSize,
                color: achievements?.achievementItem?.style?.title?.fontColor,
                fontFamily: achievements?.achievementItem?.style?.title?.fontFamily,
              }}
            >
              {achievement.title}
            </h2>

            <p
              style={{
                fontSize: achievements?.achievementItem?.style?.description?.fontSize,
                color: achievements?.achievementItem?.style?.description?.fontColor,
                fontFamily: achievements?.achievementItem?.style?.description?.fontFamily,
              }}
            >
              {achievement.description}
            </p>

            <p
              style={{
                fontSize: achievements?.achievementItem?.style?.date?.fontSize,
                color: achievements?.achievementItem?.style?.date?.fontColor,
                fontFamily: achievements?.achievementItem?.style?.date?.fontFamily,
              }}
            >
              {achievement.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
