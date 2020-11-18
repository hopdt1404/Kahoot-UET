import React from "react";
import "./index.css";
import {useSelector, useDispatch} from "react-redux";
import Question from "../Question";
import {addQuestion, removeQuestion, duplicateQuestion, setNewOrder, moveQuestion} from "../../actions/list";

function SideBar() {
    const questionList = useSelector((state) => state.list.qlist);
    const order = useSelector((state) => state.list.order);
    const dispatch = useDispatch();


    const [dragAndDrop, setDragAndDrop] = React.useState(() => {
        return {
            draggedFrom: null,
            draggedTo: null,
            isDragging: false,
            originalOrder: [],
            updatedOrder: []
        }
    });
    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);

        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: questionList
        });
        event.dataTransfer.setData("text/html", '');
    }
    const onDragOver = (event) => {
        event.preventDefault();
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom;
        const draggedTo = Number(event.currentTarget.dataset.position);
        const questionDragged = newList[draggedFrom];
        const remainingQuestions = newList.filter((a) => a !== newList[draggedFrom]);
        newList = [
            ...remainingQuestions.slice(0, draggedTo),
            questionDragged,
            ...remainingQuestions.slice(draggedTo)
        ];
        // console.log("remainQuestions",remainingQuestions);
        if (draggedTo !== dragAndDrop.draggedTo){
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            })
        }
    }

    const onDrop = () => {
        const action = moveQuestion(dragAndDrop.draggedTo,dragAndDrop.updatedOrder);
        dispatch(action);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    }


    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });

    }





    const handleAddQuestion = (questionType) => {
        const action = addQuestion(questionType);
        dispatch(action);
    };
    const handleremoveQuestion = (orderNumber) => {
        const action = removeQuestion(orderNumber);
        dispatch(action);
    };
    const handleDuplicateQuestion = (orderNumber) => {
        const action = duplicateQuestion(orderNumber);
        dispatch(action);
    };
    const handleOrderNumber = (orderNumber) => {
        const action = setNewOrder(orderNumber);
        dispatch(action);
    }
    return (
        <div className="sideBar">
            <div className="listQuestion">
                {questionList.map((question) => {
                    return (
                        <div draggable={questionList.indexOf(question) === order ? "true" : "false"}
                             data-position={questionList.indexOf(question)}
                             id={questionList.indexOf(question) === order ? "target" : ""}
                            // onClick={() => {handleOrderNumber(questionList.indexOf(question));} }
                             onClick={(event) => {
                                 console.log(event.currentTarget.dataset)
                             }
                             }
                             onDragStart={onDragStart}
                             onDragOver={onDragOver}
                             onDrop={onDrop}

                             onDragLeave={onDragLeave}
                        >
                            <Question
                                orderNumber={questionList.indexOf(question)}
                                question={question}
                                questionLength={questionList.length}
                                handleRemove={handleremoveQuestion}
                                handleDuplicate={handleDuplicateQuestion}
                                handleClick={handleOrderNumber}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="addQuestion">
                <div className="add">
                    <a className="add" href="#popupform">
                        <button className="add">Add question</button>
                    </a>
                </div>
                <div className="selectType" id="popupform">
                    <a href="/#">
                        <button onClick={() => handleAddQuestion("Quiz")}>Quiz</button>
                    </a>
                    <a href="/#">
                        <button onClick={() => handleAddQuestion("True or False")}>True or False</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
