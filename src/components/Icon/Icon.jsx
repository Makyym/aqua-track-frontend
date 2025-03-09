const Icon = ({ name, fill, stroke, width = 24, height = 24 }) => {
  return (
    <svg width={width} height={height} fill={fill} stroke={stroke}>
      <use href={`/sprite.svg#${name}`}></use>
    </svg>
  );
};

export default Icon;
