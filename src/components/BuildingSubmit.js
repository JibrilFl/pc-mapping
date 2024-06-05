"use client"

import style from "@/styles/buildings.module.scss";
import Image from "next/image";
import edit from "../../public/edit.svg";
import {useState} from "react";
import onUpdate from "@/lib/hooks/submit";

const BuildingSubmit = ({location, id}) => {
	const [comment, setComment] = useState(location);

	return (
		<div className={style.buildings__item_wrapper}>
			<textarea
				className={style.buildings__item_location}
				value={comment ? comment : ''}
				onChange={(e) => setComment(e.target.value)}
			/>
			<button className={style.buildings__item_edit}
					onClick={() => {
						onUpdate(comment, 'buildings', id)
					}}>
				<Image src={edit} alt="edit"/>
			</button>
		</div>
	)
};

export default BuildingSubmit;