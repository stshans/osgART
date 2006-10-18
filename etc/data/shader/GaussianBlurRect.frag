uniform sampler2DRect tex;
//uniform sampler2D tex;

uniform vec2 imageDimension;

void main(void) 
{
	const float unitX = 1.0 / imageDimension.x;
	const float unitY = 1.0 / imageDimension.y;

  const int RAD_HALF = 5;
  const float RAD_HALF_F = 5.0;
  const int RAD = 11;
  const int NUM = 121;
  float blurWeight[121] = {
0.000001, 0.000010, 0.000043, 0.000114, 0.000200, 0.000240, 0.000200, 0.000114, 0.000043, 0.000010, 0.000001, 
0.000010, 0.000095, 0.000429, 0.001144, 0.002003, 0.002403, 0.002003, 0.001144, 0.000429, 0.000095, 0.000010, 
0.000043, 0.000429, 0.001931, 0.005150, 0.009012, 0.010815, 0.009012, 0.005150, 0.001931, 0.000429, 0.000043, 
0.000114, 0.001144, 0.005150, 0.013733, 0.024033, 0.028839, 0.024033, 0.013733, 0.005150, 0.001144, 0.000114, 
0.000200, 0.002003, 0.009012, 0.024033, 0.042057, 0.050468, 0.042057, 0.024033, 0.009012, 0.002003, 0.000200, 
0.000240, 0.002403, 0.010815, 0.028839, 0.050468, 0.060562, 0.050468, 0.028839, 0.010815, 0.002403, 0.000240, 
0.000200, 0.002003, 0.009012, 0.024033, 0.042057, 0.050468, 0.042057, 0.024033, 0.009012, 0.002003, 0.000200, 
0.000114, 0.001144, 0.005150, 0.013733, 0.024033, 0.028839, 0.024033, 0.013733, 0.005150, 0.001144, 0.000114, 
0.000043, 0.000429, 0.001931, 0.005150, 0.009012, 0.010815, 0.009012, 0.005150, 0.001931, 0.000429, 0.000043, 
0.000010, 0.000095, 0.000429, 0.001144, 0.002003, 0.002403, 0.002003, 0.001144, 0.000429, 0.000095, 0.000010, 
0.000001, 0.000010, 0.000043, 0.000114, 0.000200, 0.000240, 0.000200, 0.000114, 0.000043, 0.000010, 0.000001
  };

   int i=0, k=0;
   vec2 coord = gl_TexCoord[0].st;
   float xCoord = coord.x - RAD_HALF_F * unitX;
   coord.y = coord.y - RAD_HALF_F * unitY;

   vec4 avg = vec4(0,0,0,0);
  
   for (i=0; i < RAD; i++) 
   {
	  coord.x = xCoord;
	  for (k=0; k < RAD; k++) 
	  {
			avg = avg +  textureRect( tex, coord) * blurWeight[i*RAD + k];			
			coord.x = coord.x + unitX;
	  }
	  coord.y = coord.y + unitY;
   }   

   vec4 originalColor = textureRect( tex, gl_TexCoord[0].st);
   //gl_FragColor = originalColor - avg;
   gl_FragColor = avg;
   gl_FragColor.w = 1.0;

   //gl_FragColor = textureRect( tex,  gl_TexCoord[0].st);	   	  
}


