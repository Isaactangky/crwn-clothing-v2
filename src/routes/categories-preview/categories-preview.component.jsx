// import SHOP_DATA from "../../shop-data.json";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.componnet";
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);
  return (
    <Fragment>
      {categoriesIsLoading ? (
        <Spinner></Spinner>
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};
export default CategoriesPreview;
