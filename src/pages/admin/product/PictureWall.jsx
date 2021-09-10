import React, {PureComponent} from 'react';

// 使用antd的upload组件上传图片等
class PictureWall extends PureComponent {
    getImgs = () => {
        return ['1.png', '2.png']
    }
    render() {
        return (
            <div>
                ...
            </div>
        );
    }
}

export default PictureWall;