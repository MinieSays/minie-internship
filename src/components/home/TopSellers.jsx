import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [nftAuthors, setNftAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNftAuthors() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      );
      setIsLoading(false);
      setNftAuthors(data);
    }
    fetchNftAuthors();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" 
                    className="row"
                    data-aos="fade-in"
                    data-aos-duration="1000"
                    data-aos-delay="50"
          >
            <ol className="author_list">
              {isLoading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <div className=" top-sellers__author--image-skeleton skeleton-box">

                        </div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <div className="top-sellers__author-info--skeleton skeleton-box">

                        </div>
                        <br></br>
                        <div className="top-sellers__author--price-skeleton skeleton-box">

                        </div>
                      </div>
                    </li>
                  ))
                : nftAuthors.length > 1 &&
                  nftAuthors.map((author) => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price}</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
