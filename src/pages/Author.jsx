import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [authorData, setAuthorData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchAuthorData() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setIsLoading(false);
      setAuthorData(new Array(data));
      setNftData(data.nftCollection);
    }
    fetchAuthorData();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        {isLoading
          ? new Array(1).fill(0).map((_, index) => (
              <section aria-label="section">
                <div className="container" key={index}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <div className="author__image--skeleton skeleton-box"></div>

                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                              <h4 className="author__text--skeleton">
                                <div className="author__name--skeleton skeleton-box"></div>
                                <div className="author__user-name--skeleton skeleton-box"></div>
                                <div
                                  id="wallet"
                                  className="author__wallet--skeleton skeleton-box"
                                ></div>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div className="author__profile--btn--skeleton skeleton-box"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))
          : authorData.map((author) => (
              <section aria-label="section">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d_profile de-flex">
                        <div className="de-flex-col">
                          <div className="profile_avatar">
                            <img src={author.authorImage} alt="" />

                            <i className="fa fa-check"></i>
                            <div className="profile_name">
                              <h4>
                                {author.authorName}
                                <span className="profile_username">
                                  @{author.tag}
                                </span>
                                <span id="wallet" className="profile_wallet">
                                  {author.address}
                                </span>
                                <button id="btn_copy" title="Copy Text">
                                  Copy
                                </button>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div className="profile_follow de-flex">
                          <div className="de-flex-col">
                            <div className="profile_follower">
                              {!isFollowing
                                ? `${author.followers}`
                                : +author.followers + 1}{" "}
                              followers
                            </div>
                            <Link
                              onClick={() => setIsFollowing(!isFollowing)}
                              to="#"
                              className="btn-main"
                            >
                              {!isFollowing ? "Follow" : "Unfollow"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}

        <div className="col-md-12">
          <div className="de_tab tab_simple">
            <AuthorItems
              nftData={nftData}
              authorImage={nftData.authorImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
