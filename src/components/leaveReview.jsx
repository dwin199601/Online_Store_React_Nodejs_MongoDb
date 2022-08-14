import React from 'react';
import productRate from '../data/productRate.json';
import TextareaAutosize from 'react-textarea-autosize';
import "./itemDetails.css";


export default function LeaveReview(props) {
    if (!props.displayReviewBox) return null;
    return (

        <form onSubmit={props.leaveComment} className="displayReviewBox">
            <label>Your Name</label>
            <input
                maxLength={30}
                className='comment-name'
                type="text"
                required
                value={props.commentObj.authorName}
                onChange={(e) => props.setCommentObj({ ...props.commentObj, authorName: e.target.value })}
            />


            <label>Comment</label>
            <TextareaAutosize
                required
                maxLength={100}
                rows={1}
                maxRows={3}
                value={props.commentObj.commentBody}
                onChange={(e) => props.setCommentObj({ ...props.commentObj, commentBody: e.target.value })}
            />

            <label>How would you rate the item</label>
            <select onChange={(e) => props.setCommentObj({ ...props.commentObj, itemRate: e.target.value })}>
                {
                    productRate.map((value) => {
                        return (
                            <option
                                key={value.id}
                            >
                                {value.rate}
                            </option>
                        )
                    })
                }
            </select>
            <div>
                <button>Submit</button>
            </div>
        </form>

    )
}
