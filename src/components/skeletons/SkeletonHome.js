import style from "@/styles/buildings.module.scss";

const SkeletonHome = () => {

	return (
		<>
			{Array(6).fill().map((item, index) => {
				return <div key={index} className={style.buildings__item_skeleton}></div>
			})}
		</>
	)
}

export default SkeletonHome;