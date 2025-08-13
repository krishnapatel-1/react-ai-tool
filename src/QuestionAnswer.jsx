
import Answer from "./components/Answer";

const QuestionAnswer=({item,ind})=>{
  return (  <>
     <div
                  key={ind + Math.random()}
                  className={item.type == "q" ? "flex justify-end" : ""}
                  >
                  {item.type == "q" ? (
                    <li
                      key={ind + Math.random()}
                      className="text-right  p-2 border-2 dark:bg-zinc-700 bg-blue-200 dark:border-zinc-700 border-blue-200  rounded-bl-3xl rounded-tl-3xl rounded-br-3xl"
                    >
                      <Answer
                        ans={item.text}
                        type={item.type}
                        totalResult={1}
                        ind={ind}
                      />
                    </li>
                  ) : (
                    item.text.map((ansItem, ansInd) => (
                      <li
                        key={ansInd + Math.random()}
                        className="text-left p-3"
                      >
                        <Answer
                          ans={ansItem}
                          totalResult={item.length}
                          type={item.type}
                          ind={ansInd}
                        />
                      </li>
                    ))
                  )}
                </div>
    </>
)
}
export default QuestionAnswer ;