import './CategoryItem.scss';

const CategoryItem = ({item}) => {
  return (
    <div className='categoryItem'>
        <img src={item.img} alt="" />
        <div className="info">
            <h1>{item.title}</h1>
            <button>SHOP NOW</button>
        </div>
    </div>
  )
}

export default CategoryItem