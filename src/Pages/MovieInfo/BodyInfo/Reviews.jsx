/* eslint-disable react/prop-types */
import { IMAGES_BASE_URL } from "../../../constants";

import { Card, CardActionArea, CardContent, Divider } from "@mui/material";
import { DividerWrapper, ReviewsWrapper } from "./style";
import moment from "moment";

const Reviews = ({ data }) => {
  return (
    <>
      <ReviewsWrapper>
        <h2>Social</h2> <span>Reviews</span>
        <div className="reviews-container">
          {data.reviews.results.map((people) => {
            return (
              <Card className="review-card" key={people.id}>
                <CardActionArea>
                  <CardContent>
                    <div className="author-content">
                      {people.author_details.avatar_path ? (
                        <img
                          className="author-image"
                          src={`${IMAGES_BASE_URL}${people.author_details.avatar_path}`}
                          alt="profile-pik"
                        />
                      ) : (
                        <div className="author-alt-img">{people.author[0]}</div>
                      )}
                      <div className="author-details">
                        <div className="reviewer-title">
                          <p>A review by {people.author_details.username}</p>
                          <p className="posted-details">
                            written by <span>{people.author}</span> on{" "}
                            {moment(people.created_at).format("MMMM DD yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="review-content">
                      <p className="content">{people.content}</p>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
        <p>
          <i>Read all reviews</i>
        </p>
        <DividerWrapper>
          <Divider className="divider"></Divider>
        </DividerWrapper>
      </ReviewsWrapper>
    </>
  );
};

export default Reviews;
