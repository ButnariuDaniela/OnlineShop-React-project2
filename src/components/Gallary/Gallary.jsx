import React, { Component } from 'react';
import { PhotoService } from '../../components/PhotoService/PhotoService';
import { Galleria } from 'primereact/galleria';
import { Button } from 'primereact/button';
// import data from '../../utils/photo.json';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
// images: [{itemImageSrc: "https://i.imgur.com/qNlMksG.jpeg",
//             thumbnailImageSrc: "https://i.imgur.com/qNlMksG.jpeg",
//             alt: "Echilibru, armonie, rafinament...",
//             title: "Clasic"},
//             {itemImageSrc: "https://i.imgur.com/tU5WGFE.jpeg",
//             thumbnailImageSrc: "https://i.imgur.com/tU5WGFE.jpeg",
//             alt: "Description for Image 2",
//             title: "Standard"},
//             {itemImageSrc: "https://i.imgur.com/83Bb4Ug.png",
//             thumbnailImageSrc: "https://i.imgur.com/83Bb4Ug.png",
//             alt: "Description for Image 3",
//             title: "Modern"},
//             {itemImageSrc: "https://i.imgur.com/qvvkdnE.jpeg",
//             thumbnailImageSrc: "https://i.imgur.com/qvvkdnE.jpeg",alt: "Description for Image 4",
//             title: "Avangard"},
//             {itemImageSrc: "https://i.imgur.com/MvQE0x4.png",
//             thumbnailImageSrc: "https://i.imgur.com/MvQE0x4.png",
//             alt: "Description for Image 5",
//             title: "Country"},
//             {itemImageSrc: "https://i.imgur.com/BHVAUIM.jpeg",
//             thumbnailImageSrc: "https://i.imgur.com/BHVAUIM.jpeg",
//             alt: "Description for Image 6",
//             title: "Antichizate"}],
export class GalleriaProgrammaticDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: [],
            activeIndex: 1
        };

        this.galleriaService = new PhotoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.thumbnailTemplate = this.thumbnailTemplate.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    componentDidMount() {
        this.galleriaService.getImages().then(data => this.setState({ images: data }));
    }

    next() {
        this.setState((prevState) => ({
            activeIndex: (prevState.activeIndex === this.state.images.length - 1) ? 0 : prevState.activeIndex + 1
        }));
    }

    prev() {
        this.setState((prevState) => ({
            activeIndex: (prevState.activeIndex === 0) ? this.state.images.length - 1 : prevState.activeIndex - 1
        }));
    }

    itemTemplate(item) {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src = "https://i.imgur.com/MvQE0x4.png"} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    thumbnailTemplate(item) {
        return <img src={item.thumbnailImageSrc} width='100px' onError={(e) => e.target.src = "https://i.imgur.com/MvQE0x4.png"} alt={item.alt} style={{ display: 'block' }} />;
    }

    render() {
        return (
            <div className="card">
                <div className="py-2">
                    <Button icon="pi pi-minus" onClick={this.prev} className="p-button-secondary" />
                    <Button icon="pi pi-plus" onClick={this.next} className="p-button-secondary ml-2" />
                </div>

                <Galleria value={this.state.images} activeIndex={this.state.activeIndex} onItemChange={(e) => this.setState({ activeIndex: e.index })} responsiveOptions={this.responsiveOptions} numVisible={5}
                    item={this.itemTemplate} thumbnail={this.thumbnailTemplate} style={{ maxWidth: '624px' }} />
            </div>
        );
    }
}