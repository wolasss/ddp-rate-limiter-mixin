echo "> Start transpiling ES2015"
echo ""
npx babel src --ignore __tests__ --out-dir ./dist
echo ""
echo "> Complete transpiling ES2015"
