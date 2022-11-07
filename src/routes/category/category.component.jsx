import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.componnet";
const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {categoriesIsLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
