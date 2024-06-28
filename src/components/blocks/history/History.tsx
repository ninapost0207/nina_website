import { IEducationItem, IResumeTile, IWorkItem } from "../../../../src/models";
import ResumeTiles from "../resume_tiles/ResumeTiles";
import "./history.scss";


interface IHistory {
    key?: number
    historyBlock: IWorkItem | IEducationItem
	tilesContent?: IResumeTile
}

const History: React.FC<IHistory> = ({historyBlock, tilesContent}: IHistory): JSX.Element => {
	return (
		<div className="history__block">
			<div>
				<span>{historyBlock.date}</span>
			</div>
			<div className="history__description">
				<h4>{historyBlock.header}</h4>
				{historyBlock.link ? 
					<a className="decorated" href={historyBlock.link} target='_blank' rel="noreferrer">{historyBlock.subHeader}</a>
					:
					<span>{historyBlock.subHeader}</span>
				}
				<p>{historyBlock.text}</p>
				{tilesContent && <ResumeTiles content={tilesContent} />}
			</div>
		</div>
	);
};

export default History;
