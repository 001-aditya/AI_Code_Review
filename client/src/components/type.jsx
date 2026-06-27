import { TypeAnimation } from 'react-type-animation'

const Type = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        "Find the bug",
        2000, // wait 1s before replacing "Mice" with "Hamsters"
        "Enhance Your code",
        2000,
        'Create the future',
        2000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '4em', display: 'inline-block' }}
      repeat={Infinity}
    />
  )
}
export default Type;
