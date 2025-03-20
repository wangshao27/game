import React, { useEffect, useRef } from 'react';

// 由于JSNES是一个外部库，我们需要动态导入
declare const JSNES: any;

interface EmulatorProps {
  romUrl: string;
  system: string;
}

const Emulator: React.FC<EmulatorProps> = ({ romUrl, system }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nesRef = useRef<any>(null);
  const frameRef = useRef<number>(0);

  // 处理键盘输入
  useEffect(() => {
    const keyboard = {
      up: 87,    // W
      down: 83,  // S
      left: 65,  // A
      right: 68, // D
      a: 75,     // K
      b: 74,     // J
      select: 32, // Space
      start: 13,  // Enter
    };

    const keyboardMapping: Record<number, number[]> = {
      // JSNES的按钮索引，0=A, 1=B, 2=SELECT, 3=START, 4=UP, 5=DOWN, 6=LEFT, 7=RIGHT
      [keyboard.a]: [1, 0],      // A按钮
      [keyboard.b]: [1, 1],      // B按钮
      [keyboard.select]: [1, 2], // SELECT按钮
      [keyboard.start]: [1, 3],  // START按钮
      [keyboard.up]: [1, 4],     // 上
      [keyboard.down]: [1, 5],   // 下
      [keyboard.left]: [1, 6],   // 左
      [keyboard.right]: [1, 7],  // 右
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const mapping = keyboardMapping[e.keyCode];
      if (mapping && nesRef.current) {
        nesRef.current.buttonDown(mapping[0], mapping[1]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const mapping = keyboardMapping[e.keyCode];
      if (mapping && nesRef.current) {
        nesRef.current.buttonUp(mapping[0], mapping[1]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 初始化NES模拟器
  useEffect(() => {
    if (!canvasRef.current || system !== 'FC') return;

    // 动态加载JSNES库
    const loadJsnes = async () => {
      try {
        // 在现实环境中，你需要从node_modules或CDN加载JSNES
        const jsnesScript = document.createElement('script');
        jsnesScript.src = 'https://unpkg.com/jsnes/dist/jsnes.min.js';
        jsnesScript.async = true;
        
        jsnesScript.onload = async () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          const imageData = ctx.createImageData(256, 240);
          
          // 创建NES实例
          const nes = new JSNES({
            onFrame: (frameBuffer: Uint8Array) => {
              // 将NES帧缓冲区转换为canvas图像数据
              for (let i = 0; i < 256 * 240; i++) {
                const pixel = i * 4;
                imageData.data[pixel] = frameBuffer[i] & 0xFF;         // R
                imageData.data[pixel + 1] = (frameBuffer[i] >> 8) & 0xFF; // G
                imageData.data[pixel + 2] = (frameBuffer[i] >> 16) & 0xFF; // B
                imageData.data[pixel + 3] = 0xFF; // Alpha (不透明)
              }
              ctx.putImageData(imageData, 0, 0);
            }
          });
          
          nesRef.current = nes;
          
          // 加载游戏ROM
          try {
            const response = await fetch(romUrl);
            const arrayBuffer = await response.arrayBuffer();
            const romData = new Uint8Array(arrayBuffer);
            
            // 加载ROM到模拟器
            nes.loadROM(romData);
            
            // 开始帧循环
            const frameLoop = () => {
              nes.frame();
              frameRef.current = requestAnimationFrame(frameLoop);
            };
            
            frameRef.current = requestAnimationFrame(frameLoop);
          } catch (error) {
            console.error('Failed to load ROM:', error);
          }
        };
        
        document.body.appendChild(jsnesScript);
      } catch (error) {
        console.error('Failed to load JSNES:', error);
      }
    };
    
    loadJsnes();
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [romUrl, system]);

  return (
    <canvas 
      ref={canvasRef} 
      width={256} 
      height={240}
      className="w-full bg-black"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default Emulator; 