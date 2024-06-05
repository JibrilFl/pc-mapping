import style from "@/styles/rooms.module.scss";

const SkeletonRooms = () => {

	return (
		<>
			{Array(6).fill().map((item, index) => {
				return 	<li className={style.rooms__item_skeleton} key={index}></li>
			})}
		</>
	)
};

export default SkeletonRooms;