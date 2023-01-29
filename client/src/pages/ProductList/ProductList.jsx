import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Newsletter from "../../components/Newsletter/Newsletter";
import Products from "../../components/Products/Products";
import "./ProductList.scss";
import TopBanner from "../../components/TopBanner/TopBanner";

const ProductList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <>
      <TopBanner />
      <div className="productList">
        <h1 className="heading">{category ? category : "All Glasses"}</h1>
        <div className="filterContainer">
          <div className="filter">
            <span className="filterText">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8052 0.0016613C11.9539 0.0542619 12.1081 0.0939235 12.2505 0.160718C13.1498 0.582775 13.4655 1.64606 12.9482 2.52399C11.8278 4.4254 10.7039 6.32487 9.5763 8.22239C9.46963 8.39651 9.4143 8.59982 9.41726 8.80683C9.42362 10.2442 9.42163 11.6811 9.42004 13.118C9.42004 13.874 9.09601 14.4201 8.4388 14.739C7.68339 15.1051 6.93155 15.4742 6.17256 15.8319C5.38813 16.2018 4.4864 15.9434 4.03514 15.2316C3.8575 14.9467 3.76616 14.6119 3.77313 14.2714C3.77313 12.4346 3.77406 10.5968 3.77591 8.75799C3.77811 8.58138 3.73067 8.408 3.63954 8.25954C2.52153 6.3751 1.42459 4.47647 0.284308 2.60707C-0.436913 1.42564 0.324067 0.202884 1.33751 0.027549C1.35575 0.0212337 1.37293 0.0119387 1.38841 0L11.8052 0.0016613ZM6.59003 1.06745C4.95833 1.06745 3.3269 1.06745 1.69574 1.06745C1.42856 1.06745 1.2079 1.16389 1.07352 1.41562C0.949474 1.64898 1.04569 1.8502 1.16695 2.05434C2.28019 3.93001 3.38668 5.81152 4.5023 7.68469C4.70465 8.01969 4.80965 8.40934 4.80447 8.806C4.7993 10.3055 4.80248 11.8051 4.80248 13.3046C4.80248 13.6483 4.80248 13.992 4.80248 14.3357C4.79992 14.4352 4.82397 14.5335 4.87189 14.6194C4.91982 14.7053 4.98971 14.7754 5.07363 14.8217C5.31219 14.9674 5.55074 14.9561 5.79803 14.8367C6.52085 14.4848 7.24207 14.1295 7.96965 13.7893C8.26426 13.6519 8.39745 13.444 8.39546 13.1009C8.38711 11.6485 8.39308 10.1957 8.39109 8.74296C8.38652 8.38765 8.4806 8.03863 8.66185 7.73854C9.0817 7.03887 9.49439 6.33461 9.90947 5.63201C10.6331 4.40745 11.3563 3.18359 12.0791 1.96041C12.2338 1.69783 12.2059 1.45653 12.0032 1.25615C11.8529 1.10795 11.6692 1.06661 11.4688 1.06703C9.84294 1.06926 8.21669 1.0694 6.59003 1.06745Z"
                  fill="#16193A"
                ></path>
              </svg>
              Filter:
            </span>
            <select
              onChange={handleFilters}
              defaultValue="Select a color"
              name="color"
            >
              <option value="">Select a color</option>
              <option value="gold">Gold</option>
              <option value="black">Black</option>
              <option value="tortoise">Tortoise</option>
              <option value="pink">Pink</option>
              <option value="yellow">Yellow</option>
              <option value="silver">Silver</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
            </select>
            <select
              onChange={handleFilters}
              defaultValue="Select size"
              name="size"
            >
              <option value="">Select frame size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="filter">
            <span
              className="filterText"
              style={{ textDecoration: "underline", fontWeight: 300 }}
            >
              Sort by:
            </span>
            <select
              onChange={(e) => setSort(e.target.value)}
              defaultValue="Sort by"
              name="sort"
            >
              <option value="">Sort by</option>
              <option value="newest">Newest</option>
              <option value="asc">Price (acs)</option>
              <option value="dsc">Price (dsc)</option>
            </select>
          </div>
        </div>
        <Products
          clearFilters={clearFilters}
          filters={filters}
          sort={sort}
          category={category}
        />
      </div>
      <Newsletter />
    </>
  );
};

export default ProductList;
