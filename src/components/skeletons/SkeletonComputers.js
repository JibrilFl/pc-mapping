import style from "@/styles/computers-room.module.scss";


const SkeletonComputers = () => {
	return (
		<>
			{Array(5).fill().map((item, index) => {
				return 	<li className={style.room__computers_item_skeleton} key={index}></li>
			})}
		</>
	)
};

export default SkeletonComputers;