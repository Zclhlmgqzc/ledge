import {Component, OnInit} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';

interface Item {
  backgroundColor: string;
  id: number;
  title: string;
  items: string[];
  textColor: string;
}

@Component({
  selector: 'component-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {
  pipeData = [
    {
      id: 1,
      title: 'Process',
      items: [
        // tslint:disable-next-line:max-line-length
        'Commit Code', 'PUSH Hooks', 'RUN CI', 'Deploy Dev', 'E2E Test', 'Manual Test', 'Deploy UAT', 'Manual Test', 'Go-Live Apply', 'Go-Live'
      ],
      backgroundColor: '#00a300',
      textColor: '#ffffff'
    },
    {
      id: 2,
      title: 'People',
      items: [
        ''
      ],
      backgroundColor: '#ff0097',
      textColor: '#ffffff'
    },
    {
      id: 3,
      title: 'Tooling',
      items: [
        'Git & GitHub', 'Git', 'Jenkins', '', '', '', '', ''
      ],
      backgroundColor: '#99b433',
      textColor: '#ffffff'
    },
    {
      id: 4,
      title: 'Artifacts',
      items: [
        'Code', '', 'Build Log', '', '', '', '', '', '', ''
      ],
      backgroundColor: '#1e7145',
      textColor: '#ffffff'
    },
    {
      id: 5,
      title: 'Pain',
      items: [
        ''
      ],
      backgroundColor: '#00aba9',
      textColor: '#ffffff'
    },
    {
      id: 6,
      title: 'Duration',
      items: [
        ''
      ],
      backgroundColor: '#ffc40d',
      textColor: '#ffffff'
    }
  ];
  private maxLength: number;

  constructor(private storage: StorageMap) {
  }

  ngOnInit(): void {
    this.maxLength = this.getMaxLength(this.pipeData);
  }

  addColumn() {

  }

  getContainerStyle(pipe: Item) {
    const {itemWidth, containerHeight} = this.getContainerHeightWidth();

    return {
      minWidth: this.maxLength * (itemWidth + 21) + 'px',
      height: containerHeight,
      background: pipe.backgroundColor,
      color: pipe.textColor
    };
  }

  private getContainerHeightWidth() {
    const innerWidth = window.innerWidth;
    let itemWidth = ((innerWidth - 200) / this.maxLength - 20);
    if (itemWidth < 100) {
      itemWidth = 100;
    }

    const itemHeightPx = itemWidth + 'px';
    const containerHeight = itemWidth + 20 + 2 + 'px';
    return {itemWidth, containerHeight, itemHeightPx};
  }

  getEditableStyle() {
    const itemSize = this.getContainerHeightWidth().itemHeightPx;
    return {
      height: itemSize,
      width: itemSize
    };
  }


  getHeaderHeight() {
    return {
      height: this.getContainerHeightWidth().itemWidth + 20 + 12 + 'px'
    };
  }

  private getMaxLength(items: Item[]) {
    let maxLength = items[0].items.length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < items.length; i++) {
      const itemLength = items[i].items.length;
      if (itemLength > maxLength) {
        maxLength = itemLength;
      }
    }

    return maxLength;
  }
}
