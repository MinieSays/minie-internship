import React from "react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";

const NftCard = ({collection}) => {
  return (
    <>
      <div key={collection.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${collection.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        >
                          <img
                            className="lazy"
                            src={collection.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {collection.expiryDate > 0 ? (
                        <div className="de_countdown">
                          <CountDown
                            duration={collection.expiryDate - Date.now()}
                          />
                        </div>
                      ) : null}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${collection.id}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {collection.price}
                        </div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{collection.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
    </>
  );
};

export default NftCard;
