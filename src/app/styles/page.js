
import BigText from "../components/big-text"

export default function Page() {
  return (
    <div className="bg-beige min-h-screen flex flex-col basic-padding gap-6">
      <BigText>This is a big text component</BigText>
      <p className="big-paragraph">This is big paragraph text</p>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
      <p className="futura-bold">This is bold text NNN with regular css</p>
      <p className="futura">This is medium text NNN with regular css</p>
      <p className="font-sans">This is medium text NNN with tailwind</p>
      <hr />
      <h1 className="serif-header">This is a header with serif font</h1>
    </div>
  )

} 