import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nftCollections, setNftCollection] = useState([]);
  const [loadMoreCollections, _] = useState(4);
  const [defaultNumberOfCollections, setDefaultNumberOfCollections] =
    useState(8);
  let exploreNftCollections = nftCollections.slice(
    0,
    defaultNumberOfCollections
  );
  const [sortBy, setSortBy] = useState("input");

  const loadMore = () => {
    setDefaultNumberOfCollections(
      defaultNumberOfCollections + loadMoreCollections
    );
  };

  useEffect(() => {
    async function fetchExploreItemsCollections() {
      if (sortBy === "input") {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
        );
        setIsLoading(false);
        setNftCollection(data);
      }

      if (sortBy === "price_low_to_high") {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high`
        );
        setIsLoading(false);
        setNftCollection(data);
      }

      if (sortBy === "price_high_to_low") {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low`
        );
        setIsLoading(false);
        setNftCollection(data);
      }

      if (sortBy === "likes_high_to_low") {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`
        );
        setIsLoading(false);
        setNftCollection(data);
      }
    }
    fetchExploreItemsCollections();
  }, [sortBy]);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="input">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!isLoading ? (
        <>
          {exploreNftCollections.map((collection) => (
            <div
              key={collection.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard collection={collection} />
            </div>
          ))}
          <div className="col-md-12 text-center">
            {exploreNftCollections.length === nftCollections.length ? null : (
              <Link
                onClick={loadMore}
                to=""
                id="loadmore"
                className="btn-main lead"
              >
                Load more
              </Link>
            )}
          </div>
        </>
      ) : (
        <>
          <>
            {new Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div>
                  <div className="explore-items__skeleton skeleton-box"></div>
                </div>
              </div>
            ))}
          </>
          <div className="col-md-12 text-center">
            {exploreNftCollections.length === nftCollections.length ? null : (
              <Link
                onClick={loadMore}
                to=""
                id="loadmore"
                className="btn-main lead"
              >
                Load more
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ExploreItems;
