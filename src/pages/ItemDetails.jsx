import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemDetails, setItemDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchItemDetails() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
      );
        setIsLoading(false);
        setItemDetails(new Array(data));
    }
    fetchItemDetails();
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {
                isLoading ? ( 
                  new Array(1).fill(0).map((_, index) => (
                    <>
                      <div className="col-md-6 text-center" key={index}>
                          <div className="item__details--image-skeleton img-fluid img-rounded mb-sm-30 nft-image skeleton-box"></div>
                      </div>
                      <div className="col-md-6">
                        <div className="item_info">
                          <h2 className="item__details--title-skeleton skeleton-box"></h2>
                          <div className="item_info_counts">
                            <div className="item_info_views skeleton-box">
                            </div>
                            <div className="item_info_like item__details-likes--skeleton skeleton-box">
                            </div>
                          </div>
                          <p className="item__details--para--skeleton skeleton-box"></p>
                          <div className="d-flex flex-row">
                            <div className="mr40">
                              <h6>Owner</h6>
                              <div className="item_author">
                                <div className="author_list_pp">
                                    <a href="/" className="item__details-owner--image--skeleton skeleton-box"></a>
                                </div>
                                <div className="author_list_info">
                                  <a href="/" className="item__details--owner-name--skeleton skeleton-box"></a>
                                </div>
                              </div>
                            </div>
                            <div></div>
                          </div>
                          <div className="de_tab tab_simple">
                            <div className="de_tab_content">
                              <h6>Creator</h6>
                              <div className="item_author">
                                <div className="author_list_pp">
                                <a href="/" className="item__details-owner--image--skeleton skeleton-box"></a>
                                </div>
                                <div className="author_list_info">
                                <a href="/" className="item__details--owner-name--skeleton skeleton-box"></a>
                                </div>
                              </div>
                            </div>
                            <div className="spacer-40"></div>
                            <h6>Price</h6>
                            <div className="nft-item-price">
                                <a href="/" className="item__details--price--skeleton skeleton-box"></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : (
                  itemDetails.length > 0 &&
                  itemDetails.map((item) => (
                    <>
                      <div className="col-md-6 text-center">
                        <img
                          src={item.nftImage}
                          className="img-fluid img-rounded mb-sm-30 nft-image"
                          alt=""
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="item_info">
                          <h2>{item.title}</h2>
  
                          <div className="item_info_counts">
                            <div className="item_info_views">
                              <i className="fa fa-eye"></i>
                              {item.views}
                            </div>
                            <div className="item_info_like">
                              <i className="fa fa-heart"></i>
                              {item.likes}
                            </div>
                          </div>
                          <p>{item.description}</p>
                          <div className="d-flex flex-row">
                            <div className="mr40">
                              <h6>Owner</h6>
                              <div className="item_author">
                                <div className="author_list_pp">
                                  {/* CHECK */}
                                  <Link to={`/author/${item.ownerId}`}>
                                    <img
                                      className="lazy"
                                      src={item.ownerImage}
                                      alt=""
                                    />
                                    <i className="fa fa-check"></i>
                                  </Link>
                                </div>
                                <div className="author_list_info">
                                  <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                                </div>
                              </div>
                            </div>
                            <div></div>
                          </div>
                          <div className="de_tab tab_simple">
                            <div className="de_tab_content">
                              <h6>Creator</h6>
                              <div className="item_author">
                                <div className="author_list_pp">
                                  <Link to={`/author/${item.creatorId}`}>
                                    <img
                                      className="lazy"
                                      src={item.creatorImage}
                                      alt=""
                                    />
                                    <i className="fa fa-check"></i>
                                  </Link>
                                </div>
                                <div className="author_list_info">
                                  <Link to={`/author/`}>{item.ownerName}</Link>
                                </div>
                              </div>
                            </div>
                            <div className="spacer-40"></div>
                            <h6>Price</h6>
                            <div className="nft-item-price">
                              <img src={EthImage} alt="" />
                              <span>{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                )
              }

              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
